---
tags: [hash map, sort, string]
title: 0049 Group Anagrams
created: '2022-03-23T16:30:50.360Z'
modified: '2022-03-23T16:40:11.617Z'
---

# 0049 Group Anagrams

## The Task

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

### Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

### Example 2:

Input: strs = [""]
Output: [ [""] ]

### Example 3:

Input: strs = ["a"]
Output: [ ["a"] ]

### Constraints:

    1 <= strs.length <= 104
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters.

## #hash map, #string, #sort

### Time Complexity

&O(nlogn)&

All strings are sorted by .sort().

### Space Complexity

&O(n)&

All elements of input are stored in a dictionary.

### The Idea

This problem is really easy if we just use sorting to detect anagrams.

To detect an anagram string:
1. Split("") to separate chars into an array
2. Sort() the array to get a "canonical" form
3. Join("") the elements into one sorted word
4. Compare the string to another processed with the same method
5. If same, they are anagrams. Else, not.

In this problem, we have to GROUP these anagrams. 

We can easily group them by using a hash map. We can place a canonical sorted string as the key. As the value we put an array of the original strings that are anagrams.

Every new string gets converted to sorted form and added under its sorted key (new or not). 

When done, we can return an array collected from map.values() which are arrays of anagrams. 

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    if (strs.length == 1) return [strs];
    
    let map = new Map();
    
    for (let i = 0; i<strs.length; i++) {
        let temp = strs[i].split("").sort().join("");
        //console.log(temp);
        let list = map.get(temp);
        map.set(temp, list ? [...list, strs[i]] : [strs[i]]);
    }
    //console.log(map);
    return Array.from(map.values());
};
```
