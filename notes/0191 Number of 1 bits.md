---
tags: [bit manipulation, built-in method, loop, number]
title: 0191 Number of 1 bits
created: '2022-03-22T06:29:15.406Z'
modified: '2022-03-22T06:31:21.507Z'
---

# 0191 Number of 1 bits

### The task: 

Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

## #built-in method, #loop, #number

Time complexity: 

&O(n)&

Space complexity: 

&O(1)&

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let number = 0;
  let binary = n.toString(2);
  for (let char of binary) {
    if (char == 1) number++;
  }
  return number;
};
```

## #bit manipulation, #number

### Time complexity: 

&O(1)&

### Space complexity: 

&O(1)&

### The idea:

n & n-1 will reduce the bits by one because in n-1 one bit will shift to the right.
1010 -1 == 1001

Then we get 1010 & 1001 = 1000. Count gets updated by 1.

We iterate once more with 1000 & 0111, and the last bit disappears. Count gets updated by 1 again.

Total bits = 2, which matches n = 1010.

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};
```
