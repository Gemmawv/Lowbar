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

_.indexOf = function (array, value, isSorted) {
  isSorted = isSorted || false;
  if ((Array.isArray(array) || typeof array === 'string') && isSorted === false) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) return i;
    }
  }

  if ((Array.isArray(array) || typeof array === 'string') && isSorted === true) {
    let start = 0;
    let end = array.length - 1;
    let mid;
    while (end >= start) {
      mid = Math.floor((start + end) / 2);
      if (array[mid] === value) {
        return mid;
      }
      else if (array[mid] < value) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }
  return -1;
};

_.filter = function (list, predicate) {
  let filteredList = [];
  _.each(list, function (item) {
    if (predicate(item)) {
      filteredList.push(item);
    }
  });
  return filteredList;
};

_.reject = function (list, predicate) {
  let filteredList = [];
  _.each(list, function (item) {
    if (predicate(item) === false) {
      filteredList.push(item);
    }
  });
  return filteredList;
};

_.uniq = function (array, isSorted) {
  let uniqueList = [];
  for (let i = 0; i < array.length; i++) {
    if (_.indexOf(uniqueList, array[i], isSorted) === -1) {
      uniqueList.push(array[i]);
    }
  }
  return uniqueList;
};

_.contains = function (list, value) {
  if (typeof list === 'object' && list !== null) {
    for (let key in list) {
      if (list[key] === value) return true;
    }
  }
  if (_.indexOf(list, value) !== -1) {
    return true;
  }
  return false;
};


if (typeof module !== 'undefined') {
  module.exports = _;
}
