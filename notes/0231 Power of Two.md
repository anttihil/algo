---
tags: [bit manipulation, loop, number]
title: 0231 Power of Two
created: '2022-03-22T06:25:56.713Z'
modified: '2022-03-22T06:32:27.757Z'
---

# 0231 Power of Two

### The task:

Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that &n = 2^x&.

## #loop, #number

### Time Complexity: 

&O(n)&

### Space Complexity: 

&O(1)&

Simple. Just convert the number to a binary string with .toString(2). Then make sure that the leading number is 1 and rest 0s.

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  let binary = n.toString(2);
  if (binary[0] == 0) return false;
  for (let i = 1; i < binary.length; i++) {
    if (binary[i] == 1) return false;
  }
  return true;
};
```

## #bit manipulation, #number

Two facts:

1. any power of 2 is bigger than 0

2. any power of 2 has exactly 1 bit with value 1 at the front and the rest are 0s.
   This means that if substract 1 from that number and do a bitwise AND, we will get a 0 if the number is a power of 2.

Bitwise AND compares to bits at a position and returns 1 only if they are both 1. Otherwise, 0.

### An example with 16:
```
10000 (16 in binary)
01111 (15 in binary)
00000 (bitwise AND of 16 and 15)
```
```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  return n > 0 && !(n & (n - 1));
};
```
