---
tags: [hash map, loop, sliding window, string]
title: 0424 Longest Repeating Character Replacement
created: '2022-03-26T19:26:38.679Z'
modified: '2022-03-26T21:30:13.797Z'
---

# 0424 Longest Repeating Character Replacement

## The Task

You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

### Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

### Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.

### Constraints:

    1 <= s.length <= 105
    s consists of only uppercase English letters.
    0 <= k <= s.length

## #loop, #sliding window, #hash map, #string

### The Idea

This problem boils down to the following question: given a size of a window, can the most frequent letter in it + k replacements to that letter fill the window or not? 

We begin from window size 1 and ask that question while we expand the window on its end side. If the answer is negative, we downsize the window by moving its the left side.

After this we measure the size of the window (indicating the largest it was filled).

Because the loop instantly turns over and add +1 to the right side, this logic amounts to keeping the window size fixed until the window gets filled.

Procedure:
1. move window right edge by one (attempt a larger window)
2. update the rightmost char in the hash map
3. update the max frequency of chars in the window
4. check if window is larger than max freq + k replacements (window not filled)
    1. remove the leftmost char from the hash map
    2. move window left edge by one (decrease window back after attempt)
5. measure window size and update max window length

The tricky points to understand are: 
1)  window size is the measure of whether continuity can be achieved within window. If the window is full, it is internally continuous.
2) We need to check if window + 1 would maintain continuity. If a window is filled, (the inner IF condition is bypassed) then we should add 1 to window length and test if char immediately to the right matches the most common element within window. That would keep the continuity intact.
3) the order of particular letters inside the window does not matter! As long as we know their quantities, we can determine whether the window can be filled.

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) { 
    const map = new Map();
    
    let start = 0;
    let maxFreq = 0;
    let maxLength = 0;
    
    for (let end = 0; end<s.length; end++) {
        
        // update the hash map with the rightmost letter entering into window
        map.set(s[end], (map.get(s[end]) ?? 0) + 1);
        
        // check if the added letter changes the frequence of most common letter within the window
        // it does not matter which letter it is because we only need to know whether the most common char plus k
        // can fill the window
        // notice that we need to only check the rightmost letter because it is the only one that changed
        maxFreq = Math.max(maxFreq, map.get(s[end]));
        
        // end- start + 1 is the window size
        // if the increased window cannot be filled with k replacements to the most frequent letter, downsize it
        if (end - start + 1 > maxFreq + k) {
            // remove the first (outgoing) letter from the hash map
            map.set(s[start], map.get(s[start]) - 1 || 0 )
            start++;
        }
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
};

```
