---
tags: [data structure]
title: Heap
created: '2022-04-07T20:23:21.749Z'
modified: '2022-04-11T05:59:24.002Z'
---

# Heap

## Binary Tree 

Two properties: 
1. Complete (all children filled from left to right)
2. Parent is always bigger than (or equal) to its child (max heap). In a min heap, it's always smaller or equal.

## Array representation

A heap can be implemented as an array which saves space by omitted any pointers that a tree requires. 

We can lay out the heap as follows: 
```
[0
  1,2
      3,4,5,6
              7,8,9,10,11,12,13,14
                                  ...]
```

Notice that each level has always twice the number of members as the previous level. 

How do we find the children and the parent of a given node at index n? 

The formulae are simple: 
First child index = &2n+1&
2nd child index = &2n+2&
Parent index = &floor((n-1)/2)&

These are simple but it's a different thing to understand why these are the way they are. 

It's clear that division by 2 has something to do with this because this is a binary tree. Each level has always twice the amount of members as the previous one.

But why exactly a given node's children are at index 2n+1 and 2n+1? 

I think this is easiest understood inductively. (It's a different issue whether induction counts as understanding.)

The main concern here is that at a given node, there are following nodes that occupy the same level of the binary tree which must be skipped and so must also be the children of those skipped nodes. 

If we start at index 0, we will notice that no nodes are skipped. The first child of 0 is at 1. 

For index 1, we must skip its sibling at 2 to get to first child at 3. (Skip 1)

For index 2, we skip two children of 1 to get at 5. (Skip 2)

For index 3, we skip one child of 1 and two children of 2 to get at 7. (Skip 3)
  
It turns out that skipped items is the same as the index of the current position, n.

### Because this structure is recursive, it is easiest to prove this via mathematical induction:

1) Base case: &n = 0&

Here there are no skipped elements. &S=0&

2) Hypothesis: &n = k&

&S = k&

(This is equivalent to saying that first child of &k& is at &2k+1&)

3) Inductive step: &n = k+1&

Consider the situation: 

&k, [k+1, k+2, k+3, ..., k+k], [2k+1, 2k+2], 2(k+1) + 1&

&2k+1& is the first child of &k& (per the hypothesis above).
To get to that from &k& we must skip all the &k& elements inside the first square brackets. 

Now, if we consider &k+1&, we must skip &k-1& elements (because &k+1& is removed from skipped elements). And we must also skip 2 children of &k& (&2k+1& and &2k+2&) marked by the second pair of parentheses. This adds up to &k+1& elements skipped. This proves that &S = k+1&.

### A simpler proof: 
Base case: For &n=0&, the first child is at &2*0+1 = 1&, so the proposition holds here. 

Hypothesis: Suppose that for &n = k&, first child is &2k+1& and second child is &2k+2&. 

Step: &n=k+1&

The first child of &k+1& will be immediately after the 2nd child of the previous element. 

Thus, first child is at &2k+3& which is the same as &2(k+1)+1&. QED.

```js
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(value) {
    let heap = this.values;
    heap.push(value);
    let added = heap.length - 1;
    function findParent(x) {
      return Math.floor((x - 1) / 2);
    }
    const bubbleUp = (child, parent) => {
      if (heap[child] > heap[parent]) {
        [heap[child], heap[parent]] = [heap[parent], heap[child]];
        bubbleUp(parent, findParent(parent));
      }
    };
    bubbleUp(added, findParent(added));
  }
  extractMax() {
    let heap = this.values;
    let last = heap.length - 1;
    let max = heap[0];
    [heap[0], heap[last]] = [heap[last], heap[0]];
    heap.pop();
    const bubbleDown = (p, l, r) => {
      if (heap[l] > heap[p]) {
        [heap[p], heap[l]] = [heap[l], heap[p]];
        bubbleDown(l, 2 * l + 1, 2 * l + 2);
      } else if (heap[r] > heap[p]) {
        [heap[p], heap[r]] = [heap[r], heap[p]];
        bubbleDown(r, 2 * r + 1, 2 * r + 2);
      }
    };
    bubbleDown(0, 1, 2);
    return max;
  }
}
```






