---
tags: [dynamic programming, number, top-down]
title: 0070 Climbing stairs
created: '2022-03-22T06:06:37.862Z'
modified: '2022-03-22T06:17:57.744Z'
---

# 0070 Climbing stairs

The task: Return the number of ways we can take n steps given the constraint that we can either take 1 or 2 steps at a time. 

## #dynamic programming, #top-down, #number

### Time Complexity: 

O(n)

### Space Complexity: 

O(n)

### The idea: 

We can calculate the ways in which we take n steps by recursively calling the functions for n-1 and n-2 and return their _sum_.

**The ways to take n steps === (the ways to take n-1) + (the ways to take n-2)**

For example, the number of ways of taking 7 steps are the ways of taking 6 steps plus the ways of taking 5 steps. (The first move is either 1-step or 2-step which leaves those recursive options.)

The problem with this approach is the time is O(2\*\*n). (Binary tree)

We can alleviate this by memoizing the results.

Create a Map to hold the memo items.
**Note:** You must initialize the map with base cases. Otherwise, the recursive calls return undefined.

On each recursive call:

First, check if n steps are already in Map and return it.
Second, set Map for n steps to be the sum of recurse(n-1) + recurse(n-2)
Third, return Map.get(n steps)

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let map = new Map();
  map.set(1, 1);
  map.set(2, 2);
  const recurse = (steps) => {
    //console.log("steps left:", steps);
    if (map.has(steps)) {
      //console.log(steps, "already in memo:", memo);
      return map.get(steps);
    }
    map.set(steps, recurse(steps - 1) + recurse(steps - 2));
    //console.log(steps, "added to memo", memo);
    return map.get(steps);
  };
  return recurse(n, map);
};
```
