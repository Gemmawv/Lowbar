var _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (arr, num) {
  if (!num && Array.isArray(arr) || !num && typeof arr === 'string') return arr[0];
  else if (Array.isArray(arr)) return arr.slice(0, num);
  else if (typeof arr === 'string') return arr.split('').slice(0, num);
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
