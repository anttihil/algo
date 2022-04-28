// pointer at end denotes the last unsorted element
// the inner pointer moves from the beginning and swaps any two items
// [current, next] that are inverted. The inverted (bigger) values "bubble" up the array.

function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    noSwaps = true;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        noSwaps = false;
      }
    }
    if (noSwaps) break;
  }
  return arr;
}

console.log(bubbleSort([]));
