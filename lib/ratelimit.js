const buckets = new Map();

/**
 * Check and consume a token for the given key.
 * Returns true if the request is allowed, false if rate limited.
 * @param {string} key - unique identifier for the rate limit bucket
 * @param {number} maxRequests - max requests per window
 * @param {number} windowMs - window duration in milliseconds
 */
function rateLimit(key, maxRequests, windowMs) {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
  }
  bucket.count++;
  buckets.set(key, bucket);
  return bucket.count <= maxRequests;
}

module.exports = { rateLimit };
