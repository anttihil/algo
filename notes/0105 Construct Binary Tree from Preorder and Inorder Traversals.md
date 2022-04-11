---
tags: [divide and conquer, hash map, interesting, recursion]
title: 0105 Construct Binary Tree from Preorder and Inorder Traversals
created: '2022-04-05T05:46:30.146Z'
modified: '2022-04-05T22:25:17.191Z'
---

# 0105 Construct Binary Tree from Preorder and Inorder Traversals

## The Task

Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

### Example 1:

Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

### Example 2:

Input: preorder = [-1], inorder = [-1]
Output: [-1]

### Constraints:

    1 <= preorder.length <= 3000
    inorder.length == preorder.length
    -3000 <= preorder[i], inorder[i] <= 3000
    preorder and inorder consist of unique values.
    Each value of inorder also appears in preorder.
    preorder is guaranteed to be the preorder traversal of the tree.
    inorder is guaranteed to be the inorder traversal of the tree.

## #recursion, #array, #divide and conquer

### Time Complexity

&O(n)&

### Space Complexity

&O(1)&

### The Idea

The preorder traversal starts with the root node. That means that if we have a preorder traversal array of a given tree, we can get its root node at the start of that array.

We can use that value to find its index in inorder array. (The values are supposed to be unique.)

Given the root node of the inorder array, we know that the nodes to the left of it form the left child tree and the nodes on the right form the right child tree.

We can recursively reconstruct the tree by calling the above procedure on those left and right subarrays of the inorder traversal. 

How to construct the tree? 

1. Create a head node
2. Assign head.val to be root node value
3. Assign head.left to be recursive call of the function on the left half
4. Assign head.right to be recursive call of the function on the right half
5. Return the head node (all the whole has been constructed recursively when those assignments are finished.)

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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    let len = preorder.length;
    if (!len) return null;
    
    let head = new TreeNode();
    
    let value = preorder[0];
    // assign root value to head.val
    head.val = value;
    let rootIndex = inorder.indexOf(value);
    
    head.left =  buildTree(preorder.slice(1,rootIndex+1), inorder.slice(0, rootIndex));
    head.right = buildTree(preorder.slice(rootIndex + 1, len), inorder.slice(rootIndex + 1, len));
    
    return head;
};
```

## #recursion, #hash map, #divide and conquer

### The Idea 

It is possible to store indexes into a hash map so that we don't have to copy the arrays while recursing. We just need to make sure that appropriate start and end indexes are tracked for each array. 

## #recursion, #interesting

### The Idea

I have to figure out this solution. 

```js
var buildTree = function(preorder, inorder) {
    p = i = 0
    build = function(stop) {
        if (inorder[i] != stop) {
            var root = new TreeNode(preorder[p++])
            root.left = build(root.val)
            i++
            root.right = build(stop)
            return root
        }
        return null
    }
    return build()
};
```

