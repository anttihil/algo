---
tags: [depth first search, loop, matrix, recursion]
title: 0200 Number of Islands
created: '2022-03-25T01:44:40.667Z'
modified: '2022-03-25T02:06:44.271Z'
---

# 0200 Number of Islands

## The Task

Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

### Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

### Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

### Constraints:

    m == grid.length
    n == grid[i].length
    1 <= m, n <= 300
    grid[i][j] is '0' or '1'.


## #recursion, #loop, #matrix, #depth first search

### The Idea:

There are two main components: 
1. A double loop to run through all the squares. If a land square is found, then increase island count by 1 and initiate dfs. 
2. A dfs to go through the island and repaint it to ocean color. This is way no island gets counted twice when the double looks for the next piece of land.

```js
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let count = 0;
    
    for (let i = 0; i<grid.length; i++) {
        for (let j = 0; j<grid[0].length; j++){
            if (grid[i][j]==1) {
                count++;
                //console.log("found land", [i,j], "count", count);
                dfs(i,j,grid);
            }
        }
    }
    return count;
};

const dir = [[1,0], [0,1], [-1,0], [0,-1]];

const validate = (row, col, grid) => {
    return row >=0 && col >= 0 && row<grid.length && col<grid[0].length;
}

const dfs = (r, c,grid) => {
    grid[r][c] = 0;
    for (let [dr, dc] of dir) {
        let row = r+dr;
        let col = c+dc;
        if (validate(row, col, grid) && grid[row][col]==1) {
            dfs(row, col, grid);        
        }  
    }  
}
```

