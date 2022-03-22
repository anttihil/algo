---
tags: [hash map, loop, string]
title: 0020 Valid Parentheses
created: '2022-03-22T06:38:06.810Z'
modified: '2022-03-22T06:51:10.707Z'
---

# 0020 Valid Parentheses

### The task:

Input consists of a string made up only of {}[]()

Return true if parentheses are valid. Return false if not.

Conditions: Parentheses must be closed 1) in correct order 2) by the matching type of parenthesis

## #hash map, #loop, #string

### Time Complexity 

&O(n)& 

Explanation: we loop through the array once.

### Space Complexity: 

&O(n)& 

Explanation: The stack takes max &n/2& space which entails &O(n)&

The idea:

First, use a hash map to store which parenthesis goes with which. This ensures easy access.

Second, we have to loop over the whole string. We should notice that each character is either a left or a right parenthesis.

If it is a lefty, we can add it to a stack. The stack ensures that we have a memory of the order of multiple embedded parentheses.

In the case the parenthesis is a rigthy, we compare it to the topmost item of the stack.

The string is valid only in the case that the righty parenthesis agrees with the previous lefty (on top of the stack). In other cases, the string is valid.

The comparison fails either because the stack has either nothing ( the string has a right parenthesis without a previous left one) or a wrong type of parenthesis (which means that there are non-matching parentheses).

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let map = new Map();
  map.set("(", ")");
  map.set("{", "}");
  map.set("[", "]");

  let stack = [];

  for (let char of s) {
    if (map.has(char)) {
      stack.push(char);
    } else if (char !== map.get(stack.pop())) {
      return false;
    }
  }
  return !stack.length;
};
```


