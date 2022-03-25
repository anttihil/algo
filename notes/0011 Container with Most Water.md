---
tags: [array, greedy, look ahead, loop, two pointers]
title: 0011 Container with Most Water
created: '2022-03-23T22:55:19.808Z'
modified: '2022-03-25T04:50:19.364Z'
---

# 0011 Container with Most Water

## The Task

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

### Example 1:

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

### Example 2:

Input: height = [1,1]
Output: 1

### Constraints:

n == height.length
2 <= n <= 105
0 <= height[i] <= 104

## #two pointers, #loop, #array, #greedy

### Time Complexity 

&O(n)&

### Space Complexity

&O(1)&

### The Idea

The key observation is that if we would like to maximize both height and width. 

We can start at the max width with two pointers at each end, and move them closer together and check whether the area is bigger than previously.

However, only the lowest side of the container will contribute to its size (area).

This means that if we were to move the taller side closer, that could by itself only decrease capacity, not increase it.

Whereas moving the lower side closer to the higher side could either decrease or increase capacity, depending on whether in fact there is a higher side.

It could be possible to slightly optimize the approach below by introducing knowledge of whether there is a longer side.

```js
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let max = 0;
    let start=0;
    let end=height.length-1;
    let distance = end - start;
    
    while(start<end) {
        let lowestHeight = Math.min(height[start], height[end]);
        max = Math.max(distance * lowestHeight, max);
        if (height[end] < height[start]) {
            end--;
            distance--;
        } else {
            start++
            distance--;
        }
    }
    return max;
};
```

## #look ahead, #loop, #greedy

Here is an optimized version that adds look ahead loops. Basically, we look ahead from lower end until we find the closest higher line. If no higher line, we terminate and return the current max capacity.

```js
var maxArea = function(height) {
    let max=0;
    let start=0;
    let end=height.length-1;
    let distance = end - start;
    
    while(start<end) {
        let lowestHeight = Math.min(height[start], height[end]);
        let distance = end - start;
        max = Math.max(distance * lowestHeight, max);
        if (height[end] < height[start]) {
            let closest;
            for (let i = end; i>start; i--) {
                if (height[i] > height[end]) {
                    closest = i;
                    break;
                } 
            }
            if (!closest) return max
            end = closest;
            
        } else {
            let closest;
            for (let i = start; i<end; i++) {
                if (height[i] > height[start]) {
                    closest = i;
                    break;
                } 
            }
            if (!closest) return max
            start = closest;
        }
    }
    return max;
};
```

