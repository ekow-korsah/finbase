const PATTERNS = [
  { re: /\b(\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{1,4}|\d{8,17})\b/g,                    r: '[ACCT]'  },
  { re: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,                                              r: '[SSN]'   },
  { re: /\b\d{9}\b/g,                                                                      r: '[RTN]'   },
  { re: /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,                             r: '[EMAIL]' },
  { re: /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g,                      r: '[PHONE]' },
  { re: /(?:account\s*holder|customer\s*name|card\s*holder|client\s*name|name)\s*[:\-]\s*[A-Za-z]+([\s,][A-Za-z]+)*/gi, r: '[NAME FIELD]' },
];

function stripSensitiveData(text) {
  return PATTERNS.reduce((t, { re, r }) => t.replace(re, r), text);
}

module.exports = { PATTERNS, stripSensitiveData };
