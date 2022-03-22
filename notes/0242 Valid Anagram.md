---
tags: [built-in method, cheesy, hash map, loop, string]
title: 0242 Valid Anagram
created: '2022-03-22T06:38:45.485Z'
modified: '2022-03-22T06:46:31.730Z'
---

# 0242 Valid Anagram

### The task: 

Given two strings s and t, return true if anagram, false otherwise.

## #hash map, #loop, #string

This was my first solution.

1. Check the lengths. If not same, return false.
2. Build one hash map of the frequencies of chars in string s.
3. Then start building another hash map of frequencies in t.
4. If a char in t that does not exist in s, return false
5. Update hash map for t.
6. If a frequency in t is greater than in s, return false.

This works because any difference in char means that some frequency in t must be higher.

Even if we have not checked all chars in t, we know that once a frequency in s (completed map) is exceeded t must be a non-anagram.

While we are in the midst of checking, we cannot conclude falsity from a _lower_ frequency in t simply because the checking is not complete yet.

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let mapS = new Map();
  let mapT = new Map();
  for (let char of s) {
    let val = mapS.get(char);
    val ? mapS.set(char, val + 1) : mapS.set(char, 1);
  }
  for (let char of t) {
    if (mapS.has(char)) {
      let val = mapT.get(char);
      val ? mapT.set(char, val + 1) : mapT.set(char, 1);
      if (mapS.get(char) < mapT.get(char)) return false;
    } else return false;
  }
  return true;
};
```

## #hash map, #loop, #string

An alternative, simpler solution that uses a single frequency hash map. With string s, we add frequencies to the map. With the second string t, we substract frequencies from the map.

If we find a char in t which is not in the map (val === undefined) or whose frequency is already 0, then we will return false.

Otherwise, return true. We can do this because if the lengths of strings are the same, string s is going to have a higher frequency at one char or a char that does not exist in t. Thus, val above in the frequency check is going to hit 0 or undefined, respectively.

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let freq = new Map();
  for (let char of s) {
    let val = freq.get(char);
    val ? freq.set(char, val + 1) : freq.set(char, 1);
  }
  for (let char of t) {
    let val = freq.get(char);
    if (val) freq.set(char, val - 1);
    else return false;
  }
  return true;
};
```

## #built-in method, #cheesy

### Time complexity 

&O(nlog(n))& 

This is based on Firefox using merge sort for .sort() implementation.

### Space complexity 

&O(n)& 

We need two arrays that are length s and t, plus some constant more for split.

Here is an alternative method. Split the string into an array (w/ empty separator), sort it, and join it back to a string (w/ empty separator). Do the same for the other string. Check if equal.

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  return s.split("").sort().join("") === t.split("").sort().join("");
};
```
