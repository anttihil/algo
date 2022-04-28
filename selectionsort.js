function selectionSort(arr) {
  // two sides: on the left, sorted, on the right, unsorted
  // i pointer at 0, moves right
  // inner loop pointer moves right from i+1
  // find minimum
  // swap i and minimum
  let min = 0;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}

console.log(selectionSort([]));
