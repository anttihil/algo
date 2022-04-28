---
tags: [binary search, binary search tree, loop, recursion]
title: 0235 Lowest Common Ancestor of a BST
created: '2022-04-09T05:12:49.420Z'
modified: '2022-04-11T05:58:20.760Z'
---

# 0235 Lowest Common Ancestor of a BST

## #binary search tree, #binary search, #recursion

### Time Complexity

&O(logn)&

### Space Complexity

&O(1)&

### The Idea

For any given subtree, the following holds: 

Either the root is within the range [p,q] (inclusive) or not. 

If it is inside, then the root is either one of the boundaries or not.

If a boundary, then it must be the lowest common ancestor. 

If not a boundary, then one of p and q is smaller than root and another is larger. Since in a BST the nodes bigger than root are on the right and nodes smaller are on the left, this means that the root is the LCA of p and q.

If the root is outside the range, then it is either smaller or bigger than both of the boundaries. In this case, we can recurse the same operation as above on the node root.left (if range is on the left) or on root.right (if range is on the right).

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p.val, q.val);}
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);}
    else return root;
};
```

## #loop

```js
var lowestCommonAncestor = function(root, p, q) {
    while (root) {
        if (root.val < p.val && root.val < q.val) root = root.right;
        else if (root.val > p.val && root.val > q.val) root = root.left;
        else return root;
    }
}
```


