function quickSort(arr) {
  const helper = (lo, hi) => {
    console.log("lo,hi", lo, hi);
    if (lo < hi) {
      let pivot = partition(arr, lo, hi);
      console.log("new pivot index", pivot, "value", arr[pivot]);
      console.log(arr);
      helper(lo, pivot);
      helper(pivot + 1, hi);
    }
  };
  helper(0, arr.length - 1);
  return arr;
}

function partition(arr, s, e) {
  let pivot = arr[Math.floor((s + e) / 2)];
  let l = s - 1;
  let r = e + 1;
  while (true) {
    l++;
    r--;
    while (arr[l] < pivot) {
      l++;
    }
    while (arr[r] > pivot) {
      r--;
    }
    if (l >= r) return r;
    [arr[r], arr[l]] = [arr[l], arr[r]];
  }
}

//not in place quicksort
function quickSortNIP(arr) {
  console.log(arr);
  if (arr.length <= 1) return arr;
  let pivot = Math.floor(arr.length / 2);
  let i = 0;
  let left = [];
  let right = [];
  while (i < arr.length) {
    if (i !== pivot) {
      if (arr[i] > arr[pivot]) right.push(arr[i]);
      else if (arr[i] <= arr[pivot]) left.push(arr[i]);
    }
    i++;
  }
  return quickSort2(left).concat([arr[pivot]], quickSort2(right));
}

console.log(quickSort([6, 7, 1, 2, 8, 4, 2, 0, 9, 4, 2, 3, 3, 5, 6, 9, 8, 7]));
