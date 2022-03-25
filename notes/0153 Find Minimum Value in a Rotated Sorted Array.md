---
tags: [binary search, recursion]
title: 0153 Find Minimum Value in a Rotated Sorted Array
created: '2022-03-25T04:35:36.759Z'
modified: '2022-03-25T04:48:34.915Z'
---

# 0153 Find Minimum Value in a Rotated Sorted Array

## The Task

## #recursion, #binary search

### Time Complexity 

&O(logn)&

### Space Complexity

&O(1)&

### The Idea 

If the middle element of the sequence is larger than the end, we know that the rotation point lies between them. We know this because the array is sorted in ascending order. For instance, [4,5,6,7,0,1,2]. 7 is bigger 2, so the order must be inverted somewhere in between.

We can apply binary search here. The only thing we need is to calculate the middle index. If middle value is bigger than end value, then continue search in the right half (minus middle). Else continue search in the left half (including middle). 

It is important to exclude the middle from one of the cases. Other wise the search would not proceed beyond a certain point. We know that the middle can be excluded from the right side search because we just compared it to the end element and found that it is larger than the end element. If it were the smallest element, it would not be bigger than the end.

```js

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    if (nums.length ===1) return nums[0];   
    
    const binarySearch = (s, e) => { 
        if (s===e) return nums[s];
        
        let m = Math.floor((s+e)/2);
        
        return (nums[m] > nums[e]) ? binarySearch(m+1,e) : binarySearch(s,m) 
    }
    return binarySearch(0, nums.length-1)
};

```
