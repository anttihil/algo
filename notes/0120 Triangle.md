---
tags: [array, bottom-up, dynamic programming, tree]
title: 0120 Triangle
created: '2022-03-22T06:18:51.330Z'
modified: '2022-03-22T06:24:58.148Z'
---

# 0120 Triangle

### The task: 

Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

### Example 1:

Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:

__2__
__3__ 4
6 __5__ 7
4 __1__ 8 3

The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).

### Example 2:

```
Input: triangle = [[-10]]
Output: -10
```

### Constraints:
```
1 <= triangle.length <= 200
triangle[0].length == 1
triangle[i].length == triangle[i - 1].length + 1
-104 <= triangle[i][j] <= 104
```
### Follow up: 
```
Could you do this using only O(n) extra space, where n is the total number of rows in the triangle?
```


## #dynamic programming, #bottom-up, #tree, #array

Time Complexity: 

O(n^2)

Space Complexity: 

O(n)

If we know the minimum distances to each of the nodes on the n-1 level, then we can create the minimum distances to reach each of the nodes on the n based on those levels.

The minimum distance to reach a node on level n == _the minimum of (min distance to left parent + node value) and (min distance to right parent + node value)_

The edge nodes are special cases because they have only one parent each.

The formula is:
if (index == 0) return n-1[index] + n[index]
if (index == n.length-1) return n-1[index]
Otherwise, return Math.min(n-1[index] + n[index], n-1[index-1] + n[index])

```js
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  if (triangle.length === 1) return triangle[0][0];

  let prev = [];
  let current = [triangle[0][0]];
  let min = 0;

  for (let i = 1; i < triangle.length; i++) {
    prev = current;
    current = triangle[i].map((num, index) => {
      if (index === 0) return num + prev[index];
      if (index === triangle[i].length - 1) return num + prev[index - 1];
      return Math.min(num + prev[index - 1], num + prev[index]);
    });
    min = Math.min(...current);
  }
  return min;
};
```
