---
tags: [backtracking, recursion, string, subsets]
title: 0784 Letter Case Permutation
created: '2022-03-22T05:59:25.201Z'
modified: '2022-03-22T06:18:06.689Z'
---

# 0784 Letter Case Permutation

## #backtracking, #recursion, #subsets, #string

### Time Complexity: 

O(2\*\*n) (very slow, because the function has to recurse twice. Very much like a classic subsets problem)

### Space Complexity: 

O(2\*\*n) (binary tree)

### The idea: recursive solution a la subsets

the recursive function takes as input: the array of modified chars (where case has been changed) and the array of remaining chars

It does not return anything, instead it updates the permutations array when it hits the base case.

### Basecase: 

An array of chars is trivial (zero length)

### Recursive case:

First check for integers at the beginning of the array.
For each integer, push it into the array of processed chars.
Then splice off those integers from the array of remaining chars.

After that, recurse the permute function twice with processed chars concat w/ first char that has been changed to uppercase/lowercase, and the first member of rest has been sliced off.

```js
/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let perms = [];
  let arr = s.split("");

  const subset = (soFar, rest) => {
    //console.log("at fresh recurse call (soFar, rest)", [soFar,rest])
    if (rest.length === 0) {
      perms.push(soFar.join(""));
    } else {
      // check chars for integers
      let numberQ = 0;
      let i = 0;
      let digitsMoved = soFar;
      while (rest[i] && rest[i].match(/\d/)) {
        digitsMoved.push(rest[i]);
        numberQ++;
        i++;
      }
      rest.splice(0, numberQ);
      if (rest.length === 0) {
        perms.push(digitsMoved.join(""));
      } else {
        // console.log("rest before next recurse", rest);
        subset(digitsMoved.concat([rest[0].toUpperCase()]), rest.slice(1));
        subset(digitsMoved.concat([rest[0].toLowerCase()]), rest.slice(1));
      }
    }
  };
  subset([], arr);
  return perms;
};
```
