---
tags: [hash map, loop, sliding window, string]
title: 0003 Longest Substring Without Repeating Characters
created: '2022-03-26T21:20:57.646Z'
modified: '2022-03-26T21:29:41.095Z'
---

# 0003 Longest Substring Without Repeating Characters

## The Task

Given a string s, find the length of the longest substring without repeating characters.

### Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

### Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

### Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

### Constraints:

    0 <= s.length <= 5 * 104
    s consists of English letters, digits, symbols and spaces.

## #loop, #sliding window, #hash map, #string

### Time Complexity 

&O(n)&

### Space Complexity

&O(1)&

### The Idea

In this sliding window problem, we are not keeping track of frequencies of characters. Instead, we keep track of the index of the latest occurrence of each character. That way we recognize whether a character has occurred before. 

If the new char at the right boundary has occurred within the window, we move the left boundary just past that index. Note that since the hash map has not yet been updated, the left boundary can move onto the right boundary at most, not past it.

```js
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {

// resizing sliding window
    
// keep a hash table of latest indexes of chars
    
    let maxLength = 0;
    let map = new Map();
    let i = 0;
    for (let j=0; j<s.length; j++) {
        // check the latest index of rightmost char
        if (map.has(s[j])) {
            // move i to latest index of newest char (skip it) provided that index is within window (no backtracking)
            i = Math.max(i, map.get(s[j]) + 1);
        }
        
        // update the index of the latest occurrence of the newest char)
        map.set(s[j], j);
        
        // measure and update window length
        maxLength = Math.max(maxLength, j - i + 1);
    }
    return maxLength;
};
```


