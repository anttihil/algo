function binarySearch(arr, target) {
  let lo = arr[0];
  let hi = arr[arr.length - 1];
  while (lo <= hi) {
    console.log(lo, hi);
    let mid = Math.floor((lo + hi) / 2);

    if (target < arr[mid]) {
      hi = mid - 1;
    } else if (target > arr[mid]) {
      lo = mid + 1;
    } else {
      return mid;
    }
  }
  return "not found";
}

let arr = [0, 1];

console.log(binarySearch(arr, 0));
console.log(binarySearch(arr, 1));
console.log(binarySearch(arr, 2));
