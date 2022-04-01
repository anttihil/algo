---
tags: [array, loop, string]
title: 0014 Longest Common Prefix
created: '2022-03-26T22:47:10.539Z'
modified: '2022-03-26T22:55:12.063Z'
---

# 0014 Longest Common Prefix

## The Task

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

### Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"

### Example 2:

Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

### Constraints:

    1 <= strs.length <= 200
    0 <= strs[i].length <= 200
    strs[i] consists of only lower-case English letters.

## #array, #string, #loop

### Time Complexity 

&O(n^2)& 

### Space Complexity 

&O(1)&

### The Idea

Procedure: 
1. Outer loop over the indices in the first string (the longest prefix can be only as long as the first string if that)
    1. Inner loop goes over the array of strings.
    2. For each pair of strings check if chars at i are the same. If not, return the prefix built sofar. 
    3. If the checks are bypassed, add char at i to the prefix string
    4. Increase index i
2. Return prefix string if outer the loop has finished.

```js
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let i = 0;
    
    let prefix = "";
    
    while (i<strs[0].length) {
        for (let j = 1; j<strs.length; j++) {
            if (strs[j-1][i] !== strs[j][i]) return prefix;  
        }
        prefix += strs[0][i];
        i++;
    }
    return prefix;
};
```
