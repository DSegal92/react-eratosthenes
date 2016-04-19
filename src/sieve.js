import { Map, List } from 'immutable';

export function getPrimes(size) {
  return sieveItUp(makeArrayFromSize(size));
}

function makeArrayFromSize(size) {
  return List().setSize(size)
}

function sieveItUp(array) {
  var upper = Math.floor(Math.sqrt(array.size))

  for (var i = 0; i < array.size; i++) {
    array = array.set(i, true)
  }

  for (var i = 2; i <= upper; i++) {
    if (array.get(i)) {
      for (var j = Math.pow(i, 2); j < array.size; j += i) {
        array = array.set(j, false)
      }
    }
  }

  return array;
}

