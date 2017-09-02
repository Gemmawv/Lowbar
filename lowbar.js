const _ = {};

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

_.every = function (list, predicate) {
  if (Array.isArray(list) || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) {
      if (predicate(list[i]) === false) return false;
    }
  }
  else if (typeof list === 'object' && list !== null) {
    for (let key in list) {
      if (predicate(list[key]) === false) return false;
    }
  }
  return true;
};

_.some = function (list, predicate) {
  if (Array.isArray(list) || typeof list === 'string') {
    for (let i = 0; i < list.length; i++) {
      if (predicate(list[i])) return true;
    }
  }
  else if (typeof list === 'object' && list !== null) {
    for (let key in list) {
      if (predicate(list[key]) === true) return true;
    }
  }
  return false;
};

_.extend = function (destination) {
  if (typeof destination === 'object' && destination !== null) {
    let sources = [].slice.call(arguments, 1);
    return Object.assign(destination, ...sources);
  }
  return destination;
};

_.defaults = function (object) {
  for (let i = 1; i < arguments.length; i++) {
    for (let key in arguments[i]) {
      if (!object[key]) {
        object[key] = arguments[i][key];
      }
    }
  }
  return object;
};

_.once = function (func) {
  let firstCall = true;
  let result;

  return function () {
    if (firstCall) {
      firstCall = false;
      result = func.apply(null, arguments);
    }
    return result;
  };

};

_.memoize = function (func, hashFunction) {
  hashFunction = hashFunction || function () {
    return arguments[0];
  };
  const memoizedFunc = function () {
    let result;
    let key = hashFunction.apply(null, arguments);
    if (memoizedFunc.cache[key] !== undefined) {
      result = memoizedFunc.cache[key];
    } else {
      result = func.apply(null, arguments);
      memoizedFunc.cache[key] = result;
    }
    return result;
  };
  memoizedFunc.cache = {};
  return memoizedFunc;
};

_.shuffle = function (list) {
  if (typeof list !== 'object' && typeof list !== 'string') return [];
  let originalList = list;
  let shuffledList = [];
  if (Array.isArray(list)) {
    while (originalList.length > 0) {
      let randomIndex = Math.floor(Math.random() * originalList.length);
      shuffledList.push(originalList[randomIndex]);
      originalList.splice(randomIndex, 1);
    }
    return shuffledList;
  }
};


if (typeof module !== 'undefined') {
  module.exports = _;
}
