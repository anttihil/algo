---
attachments: [maxarea1-grid.jpg]
tags: [depth first search, loop, matrix, recursion]
title: 0695 Max Area Of Island
created: '2022-03-25T01:03:10.102Z'
modified: '2022-03-25T02:07:04.471Z'
---



# 0695 Max Area Of Island

You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

Example 1:

![Image](@attachment/maxarea1-grid.jpg)

Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.

Example 2:

Input: grid = [ [0,0,0,0,0,0,0,0] ]
Output: 0

 

Constraints:

    m == grid.length
    n == grid[i].length
    1 <= m, n <= 50
    grid[i][j] is either 0 or 1.



## #recursion, #loop, #depth first search, #matrix

### The Idea 

This solution has two main components: 
1. We loop through all the squares with a double loop. This necessitates at least &O(n^2)& time. If we find a square with 1, this is an island and we initiate a DFS to count its area and the repaint it. The area of the island is saved to maxArea if it is bigger than previous maxArea.
2. DFS search is implemented inside a helper function that is a wrapper for the actual DFS. I want to have a separate helper function for DFS to make the presentation clearer. But because it is a separate function, we do not have access to any area variable from the maxArea function inside the wrapper. The wrapper has its own area variable that is updated by the DFS function. To eliminate the wrapper structure, we could have either: 
    1. used an object that is passed to the separate DFS function because objects retain their reference when passed to a function 
    2. write the DFS directly inside the maxAreaOfIsland function.

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */

const validate = (row,col,grid) => {
    return (row >=0 && col >=0 && row < grid.length && col < grid[0].length);
}

const dir = [[1,0], [-1,0], [0,1], [0,-1]];

const paintIsland = (x, y, grid) => {
    let area = 0;  
    const dfs = (r,c) => {
        area++;
        //console.log("row col", [r,c], "area", area)
        grid[r][c] = 0;
        for (let [dr, dc] of dir) {
            let row = dr + r;
            let col = dc + c;
            if (validate(row, col, grid) && grid[row][col] === 1) dfs(row, col); 
        }
    } 
    dfs(x,y);
    return area;
}

var maxAreaOfIsland = function(grid) {
    let maxA = 0;
    for (let i = 0; i<grid.length; i++) {
        for (let j = 0; j<grid[0].length; j++) {
            if (grid[i][j] == 1) {
                //console.log("i,j", [i,j])
                maxA = Math.max(maxA, paintIsland(i, j, grid));
            }
        }
    } 
    return maxA;      
};

```
