function extractIndex(originalname) {
  const pattern = /^2_[^_]+_(.+)\..*$/;
  const match = originalname.match(pattern);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}

module.exports = extractIndex;
