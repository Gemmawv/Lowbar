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
      iteratee(list[i], i, list);
    }

  }
  else if (typeof list === 'object' && list !== null) {
    for (var key in list) {
      iteratee(list[key], key, list);
    }

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

_.map = function (list, iteratee) {
  let newList = [];
  _.each(list, function (item, index, list) {
    newList.push(iteratee(item, index, list));
  });
  return newList;
};

_.contains = function (list, value, fromIndex) {
  if (Array.isArray(list) || typeof list === 'string') {
    fromIndex = fromIndex || 0;
    let slicedList = list.slice(fromIndex);
    if (_.indexOf(slicedList, value) === -1) return false;
    return true;
  }

  if (typeof list === 'object' && list !== null) {
    for (let key in list) {
      if (list[key] === value) return true;
    }
  }

  return false;
};

_.pluck = function (list, propertyName) {
  return _.map(list, function (item, index, list) {
    if (list[index].hasOwnProperty(propertyName)) {
      return list[index][propertyName];
    }
  });
};

_.reduce = function (list, iteratee, memo) {
  _.each(list, function (item, i, list) {
    if (!memo) {
      memo = item;
      iteratee(memo, item, i, list);
    }
    else memo = iteratee(memo, item, i, list);
  });
  return memo;
};

if (typeof module !== 'undefined') {
  module.exports = _;
}
