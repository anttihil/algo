---
tags: [array, bottom-up, dynamic programming]
title: 0198 House Robber
created: '2022-03-22T06:13:57.604Z'
modified: '2022-03-22T06:18:01.929Z'
---

# 0198 House Robber

### The setup: An array of numbers, each of which denote an amount of money that can be robbed from a house. The constraints are each house can be robber once and two adjacent houses cannot be robbed.

### The goal: Maximize the amount of money. Return the maximum amount as integer.

## #dynamic programming, #bottom-up, #array

Time Complexity: 

O(n)

Space Complexity: 

O(n)

### The idea: 

This is a dynamic programming problem because given a number of houses to choose from the decision to rob the latest depends on the previous decisions. This is the "overlapping subproblems" characteristics.

I started by sketching a chart.

| 1st | 2nd | 3rd | 4th | Max |
| --- | --- | --- | --- | --- |
| 5   |     |     |     | 5   |
| 5   | 9   |     |     | 9   |
| 5   | 9   | 7   |     | 12  |
| 5   | 9   | 7   | 1   | 12  |

The new max after adding a new house can be calculated on the basis of two previous solutions.
For example, if we add 7 value house to 5 and 9, we know that 12 is the max because we cannot rob adjacent houses 9 and 7. But if the new house would have been, say, 1, then 9 would be the max.

In effect, we need to compare the answers from two previous problem sizes.

rob(n) = Math.max(rob(n-1), rob(n-2) + nums[0])

The new house's value can only be added to rob(n-2) where the last house has not been robbed due to the adjacency constraint.
However, it is possible that the solution where the last house has been robbed (n-1)is bigger.
That's why we compare those two scenarios and take the max.

Note that this solution comes from building the optimal solution bottom up, so we know that there is no other pattern that can emerge.

The structure of this problem is strongly analogous to Fibonacci sequence: F(n) = F(n-1) + F(n-2) with the exception that we are calculating max, instead of straigth up sum.

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // rob(n) = Math.max(rob(n-1), rob(n-2)+nums[n])
  if (nums.length === 1) return nums;
  let earlier = 0;
  let later = 0;
  let now = 0;
  for (let i = 0; i < nums.length; i++) {
    earlier = later;
    later = now;
    now = Math.max(earlier + nums[i], later);
  }
  return now;
};
```
