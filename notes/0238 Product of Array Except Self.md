---
tags: [array, loop, prefix sum]
title: 0238 Product of Array Except Self
created: '2022-03-22T18:00:42.371Z'
modified: '2022-03-23T01:31:41.307Z'
---

# 0238 Product of Array Except Self

## The Task

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in &O(n)& time and without using the division operation.

### Example 1:
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```
### Example 2:
```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```
### Constraints:
```
    2 <= nums.length <= 105
    -30 <= nums[i] <= 30
    The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
```
### Follow up: 
```
Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)
```

## #array, #prefix sum, #loop

### The Idea

|Index      |0    |1    |2    |3    |
|-----------|-----|-----|-----|-----|
|nums       |1    |2    |3    |4    |
|product    |234  |134  |124  |123  |
|right pass |     |1    |12   | 123 |
|left pass  |432  |43   |4    |     |

If we make two loop passes in opposite directions, we can get a product of all the numbers except the index itself.

The crux is the idea behind prefix sum: current item at index i is the product of the previous result and the previous item in the array. 

So for example, answer[i] = answer[i-1] * nums[i-1]
(Answer[0] is initialized to neutral which is 1)

We also initialize the loops to start from indexes 1 and nums.length-2 to stagger them so that the nums[i] is never multiplied by itself. 

The loop in the opposite direction has the format:

answer[i] = answer[i] * previousResult * nums[i+1]

This is basically the same but there are two differences:
1. We have to multiply with answer[i] to incorporate the results from the first scan
2. We cannot use the answer[i+1] anymore because it has been changed already. Hence, the previousResult.

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    
    let ans= Array(nums.length).fill(1);
    
    for (let i=1; i<nums.length; i++) {
        ans[i] = ans[i-1] * nums[i-1]; 
    }
    
    let prev = 1;
    
    for (let i = nums.length-2; i>-1; i--) {
        ans[i] *= prev * nums[i+1];
        prev *= nums[i+1];
    }
    return ans
};
```




