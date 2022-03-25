---
attachments: [bst1.jpg]
tags: [binary search tree, recursion]
title: 0938 Range Sum of BST
created: '2022-03-24T21:48:55.338Z'
modified: '2022-03-25T02:07:18.822Z'
---

# 0938 Range Sum of BST

## The Task
Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].

### Example 1:

![BST1](@attachment/bst1.jpg)

Input: root = [10,5,15,3,7,null,18], low = 7, high = 15
Output: 32
Explanation: Nodes 7, 10, and 15 are in the range [7, 15]. 7 + 10 + 15 = 32.

### Example 2:

Input: root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
Output: 23
Explanation: Nodes 6, 7, and 10 are in the range [6, 10]. 6 + 7 + 10 = 23.

### Constraints:

    The number of nodes in the tree is in the range [1, 2 * 104].
    1 <= Node.val <= 105
    1 <= low <= high <= 105
    All Node.val are unique.

## #recursion, #binary search tree

### The Idea

The idea is simple. We decide which children to visit based on the current node's value. If the node's value is less than the lower boundary, then we only return recurse(right child). If more than the upper boundary, we return recurse(left child).

Only when we know that the node's value is within (inclusive) of the range, we return node.val + recurse(right) + recurse(left). This takes care of the problem that node's that are inspected but outside the range get added. Second, if the node is within the range we should visit its both children to see if they are within the range. 

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
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function(root, low, high) {
    
    if (root === null) return 0; 
    
    if (root.val < low) {
        return rangeSumBST(root.right, low, high);
    }
    
    if (root.val > high) {
        return rangeSumBST(root.left, low, high);
    }
    return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);

};
```
