---
tags: [binary tree, depth first search, loop, recursion, stack]
title: 0226 Invert Binary Tree
created: '2022-03-26T23:39:33.287Z'
modified: '2022-03-26T23:56:56.964Z'
---

# 0226 Invert Binary Tree

## The Task

Given the root of a binary tree, invert the tree, and return its root.

### Example 1:

Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

### Example 2:

Input: root = [2,1,3]
Output: [2,3,1]

### Example 3:

Input: root = []
Output: []

### Constraints:

    The number of nodes in the tree is in the range [0, 100].
    -100 <= Node.val <= 100



## #recursion, #binary tree, #depth first search

### Time Complexity

&O(2^n)&

### Space Complexity

&O(1)& 

(If the stack counts as space, it will be &O(logn)&. Tree height is &logn& where &n& is the number of nodes.)

### The Idea 

We are simply mutating the tree recursively. We don't need to return anything from the inner recursive levels for that reason. 

We just need a base case of return null if the head is empty. This basecase also terminates recursion when there are no more nodes.

The main trick here is the same as in variable inversion. Take a temp variable and put child A in it. Then assign child B to child A. Then assign temp (previous child A) to child B.

Make a recursive call for child A and child B respectively.

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return null;
    let temp = root.right;
    root.right = root.left;
    root.left = temp;
    
    invertTree(root.left);
    invertTree(root.right);
    
    return root;  
};
```

## #stack, #loop, #depth first search, #binary tree

### The Idea

Here is an interative solution that uses the stack/DFS. 

```js
var invertTree = function(root) {
    if (!root) return null;

    let stack = [root];

    while (stack.length) {
      let current = stack.pop();
      let temp = current.right;
      current.right = current.left;
      current.left = temp;

      if (current.right !== null) stack.push(current.right);
      if (current.left !==null) stack.push(current.left);
    }
    return root;  
};
```
