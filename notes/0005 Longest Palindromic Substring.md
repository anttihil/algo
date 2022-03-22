---
tags: [bottom-up, dynamic programming, string]
title: 0005 Longest Palindromic Substring
created: '2022-03-22T06:05:11.459Z'
modified: '2022-03-22T06:17:53.295Z'
---

# 0005 Longest Palindromic Substring

## #dynamic programming, #bottom-up, #string

Time Complexity = O(n\*\*2) (because of the Cartesian product grid, and double embedded loop)

Space Complexity = O(n\*\*2) (because of the grid)

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 1) return s;

  let lpsStart = 0;
  let lpsLength = 1;
  let grid = Array(s.length)
    .fill(null)
    .map((x) => Array(s.length).fill(false));

  for (let i = 0; i < s.length; i++) {
    grid[i][i] = true;
  }

  //console.log(grid);

  for (let end = 0; end < s.length; end++) {
    for (let start = end - 1; start >= 0; start--) {
      //console.log("[start,end]:" [start, end]);
      if (s[end] === s[start]) {
        if (end - start === 1 || grid[start + 1][end - 1]) {
          grid[start][end] = true;
          let len = end - start + 1;
          if (len > lpsLength) {
            lpsLength = len;
            lpsStart = start;
          }
        }
      }
    }
  }

  //console.log(grid);

  return s.slice(lpsStart, lpsStart + lpsLength);
};
```
