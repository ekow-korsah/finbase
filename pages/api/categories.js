export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  const CATEGORIES = [
    'Groceries','Coffee','Dining Out','Food Delivery','Subscriptions',
    'Gas','Pharmacy','Shopping','Entertainment','Transportation',
    'Utilities','Healthcare','Travel','Income','Salary','Rent Income',
    'Savings','Transfers','ATM/Cash','Fees & Interest','Uncategorized'
  ];
  res.json(CATEGORIES);
}
