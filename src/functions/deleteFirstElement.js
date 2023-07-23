function removeFirstElement(array) {
  if (Array.isArray(array) && array.length > 0) {
    array.shift();
  }
  return array;
}

module.exports = removeFirstElement;
