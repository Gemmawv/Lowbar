var _ = {};

_.identity = function(value) {
  return value;
};

_.first = function(arr, num) {
  if (Array.isArray(arr) || typeof arr === 'string' && !num) return arr[0];
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
