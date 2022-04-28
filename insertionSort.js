// outer loop pointer denotes the first unsorted element.
// The first element is already sorted here.
// we take an element in the unsorted area
// we keep swapping it with sorted elements that are bigger than
// the current element. Once the element is equal or smaller, we break.
// We can do so because we are inserting the element into a sorted order.

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      else break;
    }
  }
  return arr;
}

console.log(insertionSort([]));
