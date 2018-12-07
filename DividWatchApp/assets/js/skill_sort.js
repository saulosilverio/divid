// multiSort(arr, [options | skillKey])
// Parameters:
// arr ... an array of form [ [ skill, var], ... ]
//         [ [ -3, A ], [ -1, B ], [ 5, C ], [ -1, D ] ]
//         OR
//         an array of form [ { 'skill': value, other key/values } ]
//         [ { 'skill': -3, k: A ], { 'skill': -1, v: B }, [ 5, C ] ]
//         OR
//         an object of form { 'index': {'skill': value, other key/values }, ... }
//         (please note that numerical indexes won't work)
//
// skillKey ... name of the key which holds each element's skill (default:
//                'skill')
//
//  as the last item shows, you can even mix the forms
//
// Returns:
// if the first form is used, only the 'var' will be returned; with the
// second form the elements are untouched, only their position changed.
//
// Notes:
// Entries in the source array with the same skill are returned in the
// same order
// * skill might be a function closure
function multiSort (arr, options) {
  // source: http://stackoverflow.com/a/9716515/4832631
  function isNumber (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  function cmp (a, b) {
    if (a === b) {
      return 0
    }

    if (isNumber(a) && isNumber(b)) {
      return parseFloat(a) < parseFloat(b) ? -1 : 1
    } else {
      return a < b ? -1 : 1
    }
  }

  var i
  var j
  var ret1 = {}
  if (typeof options === 'string') {
    options = {
      key: options
    }
  } else if (!options) {
    options = {
      key: 'skill'
    }
  }
  if (!('key' in options)) {
    options.key = 'skill'
  }
  if (!('compareFunction' in options)) {
    options.compareFunction = cmp
  }

  // check if input array is an object, convert to array
  var isObject = false
  if (typeof arr.length === 'undefined') {
    var newArr = []
    isObject = true

    for (i in arr) {
      arr[i].__multiSort_index = i
      newArr.push(arr[i])
    }

    arr = newArr
  }

  // first put all elements into an assoc. array
  for (i = 0; i < arr.length; i++) {
    var cur = arr[i]
    var wgt
    var data

    if (cur.length) {
      wgt = cur[0]
      data = cur[1]
    } else {
      wgt = cur[options.key]
      data = cur
    }

    if (typeof wgt === 'function') {
      wgt = wgt()
    }

    if (!wgt) {
      wgt = 0
    }

    if (!ret1[wgt]) {
      ret1[wgt] = []
    }

    ret1[wgt].push(data)
  }

  // get the keys, convert to value, order them
  var keys1 = []
  for (var k in ret1) {
    keys1.push(k)
  }
  keys1.sort(options.compareFunction)

  if (options.reverse) {
    keys1.reverse()
  }

  var ret2 = []

  // iterate through array and compile final return value
  for (i = 0; i < keys1.length; i++) {
    for (j = 0; j < ret1[keys1[i]].length; j++) {
      ret2.push(ret1[keys1[i]][j])
    }
  }

  // rebuild object if necessary
  if (isObject) {
    newArr = {}
    for (i = 0; i < ret2.length; i++) {
      var ob = ret2[i]

      var index = ob.__multiSort_index
      delete ob.__multiSort_index

      newArr[index] = ob
    }

    ret2 = newArr
  }

  return ret2
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = multiSort
}
if (typeof window !== 'undefined') {
  window.multiSort = multiSort
}