---
tags: [divide and conquer, dynamic programming, loop, recursion]
title: 0054 Maximum Subarray
created: '2022-03-22T06:39:42.295Z'
modified: '2022-03-22T08:01:19.426Z'
---

## 0054 Maximum Subarray

### The task:

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

### Example 1:
```
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]

Output: 6

Explanation: [4,-1,2,1] has the largest sum = 6.
```

### Example 2:
```
Input: nums = [1]
Output: 1
```
### Example 3:
```
Input: nums = [5,4,-1,7,8]
Output: 23
```
### Constraints:
```
1 <= nums.length <= 105
-104 <= nums[i] <= 104
```
### Follow up:
```
If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
```

## #divide and conquer, #recursion

### The idea: 

Each contiguous array can be viewed as being expanded from a selected center point. 

That gives an idea for a divide and conquer solution. Choose the midpoint of a segment as the expansion point. 

To determine the max contiguous sum from the centerpoint, we loop away from the midpoint in both directions. 

Maintain two updated variables: localSum and globalSum. 

Local sum is updated by adding the next element of the array to it. Global sum is only updated when the local sum exceeds the previous global sum. 

The local sum tracks the progressive sum of the elements that are contiguous with the expansion point. The global sum retains the largest of those sums.

To get the value of the sub-array centered on midpoint we add together the global sum of the right and left sides and the midpoint's own value. That is because _the minimum size of the array whose sum is returned is one element_. 

Then calculate the max sum for the sub array that is immediately left of the midpoint.

Do the same for the sub-array that is to the right of the midpoint.

Return the maximum of those three results.


```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    
    const dnc = (nums, left, right) => {
        if (left>right) return -Infinity
        let mid = left + Math.floor((right - left)/2)
        console.log(mid);
        
        let leftMax = dnc(nums, left, mid-1);
        let rightMax = dnc(nums, mid+1, right);
        
        let leftLocalSum = 0;
        let leftGlobalSum = 0;
        
        for (let i=mid-1; i>=left; i--) {
            leftLocalSum += nums[i];
            leftGlobalSum = Math.max(leftLocalSum, leftGlobalSum);
        }
        
        let rightLocalSum = 0;
        let rightGlobalSum = 0;
        
        for (let i=mid+1; i<=right; i++) {
            rightLocalSum += nums[i];
            rightGlobalSum = Math.max(rightLocalSum, rightGlobalSum);
        }
        
        return Math.max(leftMax, rightMax, rightGlobalSum + leftGlobalSum + nums[mid] )
    }
    return dnc(nums, 0, nums.length - 1)
};
```

## #dynamic programming, #loop

### Time Complexity 

&O(n)&

### Space Complexity

&O(1)&

### The Idea

We can keep track of two variables, local Max and global Max.

The idea is pretty simple: 
1. Initialize local and global maximum to the value of the first element
2. Loop through array
3. Set local max as the max of current number or current local max plus current number 
 - This tracks the idea that a new element is added to the progressing subarray exactly when adding the preceeding subarray would increase the value of the new element, i.e. make a positive contribution. Example: [2,-4] + 5 vs 5 alone. [2,-4] makes a negative contribution, so it can be discarded.
4. After the local max has been processed, we choose global max to be the larger of its previous value and the current value of local max.
  - This means that even if a previous subarray gets discarded due to diminishing values being added to local max, we will still retain the largest encountered sum in memory

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    
    let localMax = nums[0];
    let globalMax = nums[0];
    
    for (let i=1; i<nums.length; i++) {
        localMax = Math.max(localMax + nums[i], nums[i]);
        globalMax = Math.max(localMax, globalMax);
    }
    
    return globalMax;
};
```
