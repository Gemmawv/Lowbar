var _ = {};

_.identity = function (value) {
  return value;
};

_.first = function (arr, num) {
  if (!num && Array.isArray(arr) || !num && typeof arr === 'string') return arr[0];
  if (Array.isArray(arr)) return arr.slice(0, num);
  if (typeof arr === 'string') return arr.split('').slice(0, num);
};

_.last = function (arr, num) {
  if (!num && Array.isArray(arr) || !num && typeof arr === 'string') return arr[arr.length - 1];
  if (Array.isArray(arr)) return arr.slice(num - 1);
  if (typeof arr === 'string') return arr.split('').slice(num - 1);
};

_.each = function (list, iteratee) {
  if (!iteratee) return list;
  if (Array.isArray(list) || typeof list === 'string') {
    for (var i = 0; i < list.length; i++) {
      iteratee(list[i]);
    }
    return list;
  }
  if (typeof list === 'object' && list !== null) {
    for (var key in list) {
      iteratee(list[key]);
    }
    return list;
  }
  return list;
};

_.indexOf = function (array, value) {
  let index = -1;
  if (Array.isArray(array) || typeof array === 'string') {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) index = i;
    }
  }
  return index;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
