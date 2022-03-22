---
tags: [array, hash map]
title: 0001 Two Sum
created: '2022-03-22T06:33:45.913Z'
modified: '2022-03-22T06:36:35.000Z'
---

## 0001 Two Sum

## #hash map, #array

### Time Complexity: 

&O(n)&

### Space Complexity: 

&O(n)&

This could be also done easily in &O(n^2)& time. In that solution, one could just have two pointers searching through all pairs. Outer pointer moves from start to the right, inner pointer moves always from outer pointer's location until the end.

Introducing a hash map we can save the difference between target and current number as a memo key, and then save the index as the value. For each new number, we first check whether the current number exists as a key in the memo (because target - prev = current).

If yes, return current index and previous index.

If not, save (target - current number) as a key in the memo.

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) return [i, map.get(target - nums[i])];
    map.set(nums[i], i);
  }
};
```
