#!/bin/bash
# Try common Node.js locations
NODE_PATH=$(which node 2>/dev/null)
if [ -z "$NODE_PATH" ]; then
  for d in "$HOME/.nvm/versions/node/"*/bin "$HOME/.volta/bin" "/opt/homebrew/bin" "/usr/local/bin"; do
    [ -f "$d/node" ] && export PATH="$d:$PATH" && break
  done
fi
cd "$(dirname "$0")"

echo "==> Stopping any existing FinBase / Next.js processes..."
pkill -f "next dev" 2>/dev/null
pkill -f "next-server" 2>/dev/null

# Kill anything still holding port 3000
PORT=3000
lsof -ti:$PORT | xargs kill -9 2>/dev/null

sleep 1

echo "==> Cleaning build cache..."
rm -rf .next

echo "==> Starting FinBase on http://localhost:$PORT ..."
npm run dev -- --port $PORT &
SERVER_PID=$!

# Wait up to 45 seconds for the server to return HTTP 200
echo "==> Waiting for server..."
READY=0
for i in $(seq 1 45); do
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:$PORT" 2>/dev/null)
  if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "304" ]; then
    READY=1
    break
  fi
  sleep 1
done

if [ "$READY" = "1" ]; then
  echo "==> FinBase is ready!"
  open "http://localhost:$PORT"
else
  echo "==> Server did not start in time — check terminal output above for errors."
fi

# Keep terminal open so server stays alive
wait $SERVER_PID
