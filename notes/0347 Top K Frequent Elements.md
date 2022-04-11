---
tags: [array, bucket sort, counting, hash map, heap sort]
title: 0347 Top K Frequent Elements
created: '2022-04-05T05:24:36.180Z'
modified: '2022-04-05T05:45:29.383Z'
---

# 0347 Top K Frequent Elements

## The Task

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

### Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

### Example 2:

Input: nums = [1], k = 1
Output: [1]

### Constraints:

    1 <= nums.length <= 105
    k is in the range [1, the number of unique elements in the array].
    It is guaranteed that the answer is unique.

### Follow up: 

Your algorithm's time complexity must be better than O(n log n), where n is the array's size.


## #bucket sort, #array, #hash map, #counting

### Time Complexity

&O(n)&

### Space Complexity

&O(n)&

### The Idea 

This solution combines several elements: 
1. Count the frequency of each number into a hash map
2. Make a bucket array where each index stands for the number of identical elements in the original input and that index has an array.
3. Read each frequency from the hash map and add the key of that frequency (an integer from the input) into the array located at the bucket index corresponding to that frequency. For example, if there were five 8's, we would add 8 into the array at bucket index 5. Bucket index 5 is the collection of integers that have five copies in the input.
4. Then loop through bucket array starting from the last element (containing the integers that are most numerous) and concatenate the array at that index with the result array. Stop when result.length equals or exceeds k. (We have found k most frequent integers.) 
5. We don't need to worry about adding too many results to the array from a bucket index with too many entries because the instructions guarantee that the answer is unique. This rules out the possibility that we would have to exclude some part of an array in the bucket array because that scenario would imply the existence of multiple equivalent answers.  

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let freq = new Map();
    
    for (let num of nums) {
        freq.set(num, freq.get(num) + 1 || 1);
    }
    
    let buckets = [];
    
    for (let [key,val] of freq) {
        if (buckets[val] === undefined) {
            buckets[val] = new Array();
        } 
        buckets[val].push(key);
    }

    let result = [];
    
    for (let i=buckets.length-1; i>=0 && result.length<k; i--) {
        
        if (buckets[i] !== undefined) result = result.concat(buckets[i]);
    }
    return result;
};
```

## #heap sort

### Time Complexity 

&O(nlogn)&

### Space Complexity

&O(n)&

### The Idea

This problem can be also solved by constructing a heap first and then performing a heap sort with the means of that heap.




