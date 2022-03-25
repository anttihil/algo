---
tags: [linked list, two pointers]
title: 0141 Cycle in a Linked List
created: '2022-03-23T21:48:21.967Z'
modified: '2022-03-23T21:54:36.951Z'
---

# 0141 Cycle in a Linked List

## The Task

Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

## #two pointers, #linked list

### Time Complexity

&O(n)&

### Space Complexity 

&O(1)&

### The Idea

We have to only return whether there is a cycle or not, not the location of the cycle. This means we can release a fast pointer that moves twice as fast as a slow pointer. If there is a cycle, the fast pointer will spin in that cycle. Eventually the slow pointer will reach the cycle as well and the fast pointer will catch it. If that happens, return true. 

If the fast pointer can't proceed to next node, return false. This indicates that there is a dead end.

Remember to return false if the list is null. There will be a runtime error when trying to loop through a null list with "fast.next".

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (!head) return false;
    
    let slow = head;
    let fast = head;
    
    while(fast.next) {
        fast=fast.next;
        if (!fast.next) return false
        fast= fast.next;
        slow = slow.next;
        if (fast === slow) return true
    }
    return false;
};
```



