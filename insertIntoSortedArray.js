class Sorted {
  constructor(arr) {
    this.values = arr;
  }
  insert(num) {
    let arr = this.values;
    const helper = (num, lo, hi) => {
      // if num is lower than closest value, then hi ends up one less than closest
      //(because hi moves past lo when num is less than mid)
      // if higher, then hi ends on the closest value
      // (because lo moves past hi when num is more than mid)
      if (lo > hi) return hi + 1;
      let mid = Math.floor((lo + hi) / 2);
      if (arr[mid] === num) return mid;
      if (arr[mid] < num) {
        return helper(num, mid + 1, hi);
      }
      return helper(num, lo, mid - 1);
    };
    let index = helper(num, 0, arr.length - 1);
    let end = arr.slice(index);
    arr[index] = num;
    for (let i = 0; i < end.length; i++) {
      arr[i + index + 1] = end[i];
    }
    // arr.splice(index + 1, end.length, ...end);
    return arr;
  }
}

let arr = new Sorted([12]);
arr.insert(12);
arr.insert(10);
arr.insert(13);
arr.insert(11);
arr.insert(5);
arr.insert(15);
arr.insert(1);
arr.insert(11);
arr.insert(6);
arr.insert(17);
arr.insert(14);
console.log(arr);
