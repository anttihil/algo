function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.ceil((arr.length - 1) / 2);
  return merge(
    mergeSort(arr.slice(0, mid)),
    mergeSort(arr.slice(mid, arr.length))
  );
}

function mergeSortI(arr, s = 0, e = arr.length - 1) {
  if (e === s) return [arr[s]];
  let mid = Math.floor((e + s) / 2);
  return merge(mergeSortI(arr, s, mid), mergeSortI(arr, mid + 1, e));
}

function merge(a, b) {
  let i = 0,
    j = 0;

  let res = [];
  while (i < a.length && j < b.length) {
    if (a[i] < b[j]) {
      res.push(a[i]);
      i++;
    } else {
      res.push(b[j]);
      j++;
    }
  }
  while (i < a.length) {
    res.push(a[i]);
    i++;
  }
  while (j < b.length) {
    res.push(b[j]);
    j++;
  }
  return res;
}

console.log(mergeSort([6, 1, 2, 9, 2, 4, 6, 8, 2, 3, 1, 5]));
console.log(mergeSortI([6, 1, 2, 9, 2, 4, 6, 8, 2, 3, 1, 5]));
