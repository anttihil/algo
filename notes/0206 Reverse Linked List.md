---
tags: [linked list, loop, recursion, three pointers]
title: 0206 Reverse Linked List
created: '2022-03-23T17:09:24.738Z'
modified: '2022-03-23T19:35:16.921Z'
---

# 0206 Reverse Linked List

## The Task

Given the head of a singly linked list, reverse the list, and return the reversed list.

## #linked list, #loop, #three pointers

### Time Complexity 

&O(n)&

Must visit each node.

### Space Complexity

&O(1)&

We only store three pointers each of which is just a single node.

### The Idea

We move along the links and change the current node's next pointer to the previous node.

This requires that we keep three pointers. This is similar to how reversing two variables requires one extra variable as the temp so that we don't lose reference to one of them.

The three pointers that are required:
1. One that stores the next node in the chain. If we didn't, then we would lose connection to the following nodes when we revert the direction of the next pointer of the current node.
2. Current node. This is the node that is operated on. We need this for reverting the direction of the next pointer.
3. Previous node. This is required as the target of the reverted next pointer.

The key in this problem is the sequence in which pointers are reassigned. 

We must end the action sequence such that next pointer is one ahead of current. That is the starting state. This we can terminate the process when all the directions have been reversed and next is assigned to null (past the last node).

1. Move the current pointer to next (this is the new node to process and we know that it exists because of the while condition)
2. Make sure to move the next pointer to one forward (to prevent being cut off)
3. Revert the next property of current to point to previous node (which is one behind the current now)
4. Move the previous pointer to the same place as current

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head) return null
    
    let prev = null;
    let current = head;
    let next = head;
    
    while(next) {
        current = next;
        next = current.next;
        current.next = prev;
        prev = current;
    }
    return current;
};
```

## #recursive

### The Idea 

Exactly the same as the above approach but with recursive traversal.

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head || !head.next) return head
    
    function recurse(prev, current, next) {
        if (next === null) return current;
        current = next;
        next = current.next;
        current.next = prev;
        return recurse(current, current, next) 
    }
    return recurse(null, null, head)
    
};
```

An even simpler variation: 

```js
var reverseList = function(head, prev = null) {
  if (!head) return prev;

  const next = head.next;
  // advance next
  head.next = prev;
  // change direction of head's next pointer to previous
  return reverseList(next, head);
  // recurse where next is the new head and old head is the new previous
};
```

## #recursive

### The Idea

In this recursive solution, we call reverseList first on the second node. 
This takes the leap of faith that the second node and its children have been already reversed.

The trick here is to retain reference to both the new head of the reversed list (its return value) and the second node. 

With the second node, we change its next pointer to the original first node (old head). Then we change first node's next pointer from the second node (this would create a cycle) to null. This completes the reversal.

We return the new head. 

```js

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (!head || !head.next) return head
    // suppose that all the next nodes have been reversed
    let node = reverseList(head.next);
    // This returns, for instance, reverseList(2) === [5, 4, 3, 2]
    // The trick is that we have a reference to both 2 and 5
    // With reference to 2 we can reverse the last remaining next pointer
    // With reference to 5 we get access to the new head of the reversed list
    // The situation:
    // 1 -> [2 <- 3 <- ...]
    
    head.next.next = head;
    // change 2's next pointer to head
    // 1 <- [2 ...]
    // AND
    // 1 -> [2....] 
    // This is a cycle
    
    head.next = null;
    // Eliminates the cycle by redirecting 1's next pointer to 2
    // null <- 1 <- [2 ...]
    
    return node
    // We return the new head of the reversed list after the last remaining link has been reversed
};

```
