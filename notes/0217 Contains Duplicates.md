---
tags: [array, hash map]
title: 0217 Contains Duplicates
created: '2022-03-22T06:37:37.622Z'
modified: '2022-03-22T06:45:37.299Z'
---

# 0217 Contains Duplicates

### The task:

Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

## #hash map, #array

### Time Complexity 

&O(n)&

### Space Complexity 

&O(n)&

### The idea

Save visited numbers to a hash map. If any new number occurs in the map, we know that it is a duplicate.

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  let map = new Map();

  for (let num of nums) {
    if (map.has(num)) return true;
    map.set(num, true);
  }
  return false;
};
```
