---
tags: [hash map, sliding window, string]
title: 0076 Minimum Window Substring
created: '2022-03-30T04:41:03.558Z'
modified: '2022-03-30T05:18:04.791Z'
---

# 0076 Minimum Window Substring

## The Task 

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

A substring is a contiguous sequence of characters within the string.

### Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.

### Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.

### Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.

### Constraints:

    m == s.length
    n == t.length
    1 <= m, n <= 105
    s and t consist of uppercase and lowercase English letters.

### Follow up: Could you find an algorithm that runs in O(m + n) time?


## #sliding window, #hash map, #string

### The Idea 

This solution works in waves. It works in a way analogous to a spring or a slinky being pulled across a surface. 

First, we only move the right side and expand until we find a valid solution (not necessarily minimal). Then, we move the left boundary towards the right, shrinking the window until the solution within it is not valid anymore. 

The trick is that we update the global solution while the window is valid but before we shrink it again. This way we get the minimum valid solution for this interval ending at the given endpoint. The minimum solution is the last update to the global solution made before the window shrank below meeting the validity requirements. 

After the window is not valid, we move the right boundary again until we have a valid solution again (not necessarily minimal for that interval). Then we move the left boundary in again. We can think of this contraction process as cutting off the excess off of a valid solution until it becomes barely invalid. 

1. Have a resizable window that starts at 0,0
2. Outer loop until right boundary is at the last char 

    1. Decrease the right boundary char required amount in hash map. We are keeping track of how many we still require to meet the requirements of a valid string

    2. If char in hash map is > 0, decrease global counter. We don't want to decrease global counter for chars we don't need at the moment.

    3. Inner loop while counter === 0 (the window is valid, meets requirements)

        1. Requirements met => update global solution if smaller than previous

        2. Increase the left boundary char required amount in hash map. We are releasing the leftmost char at step 4 below. 

        3. If the left most char required amount > 0 then we increase counter. Because we release a required char, we might not have enough of it to make a valid window.

        4. Move window left boundary (decrease window). We try a smaller window until the window is just below valid. Basically we are cutting of the excess from the left side when we find a valid solution. Notice that just before the window becomes invalid here at step 4, the earlier step 1 has saved the last valid solution just before it became invalid. This is the way we can get a minimum valid solution after first moving only the right boundary to cover the next valid solution.

    4. Move window right boundary (increase window). We try a bigger window until the window is valid again
```js
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    if (t.length > s.length) return "";
    
    let counter = t.length;
    let map = {};
    for (let c of t) {
        c in map ? map[c]++ : map[c] = 1;
    }
        
    let stringStart = 0;
    let minWindow = s.length + 1;
    
    let end = 0;
    let begin = 0;
    
    while (end<s.length) {
        // if the right boundary has a required element, decrease that requirement and global counter
        if (s[end] in map) {
            if (map[s[end]] > 0) {
                counter--; 
            }
            map[s[end]]--;
        } 
        
        // while the string is valid, update the current solution and hashmap. 
        // Then decrease window until the string is not valid.
        while (counter === 0) {
            if (end - begin + 1< minWindow) {
                stringStart = begin;
                minWindow = end-begin + 1;
            }
            // if the left boundary has a required elem, increase requirement and global counter and contract window.
            
            if (s[begin] in map) {
                map[s[begin]]++;
                if (map[s[begin]] > 0) {
                    counter++;
                }
            }
            // Decrease window size on the left boundary
            begin++;
        }
        // Increase window size (try a bigger window until a valid solution is found)
        end++; 
    }
    return minWindow === s.length + 1 ? "" : s.slice(stringStart, stringStart + minWindow)
}
```
