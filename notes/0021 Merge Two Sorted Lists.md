---
title: 0021 Merge Two Sorted Lists
created: '2022-04-15T00:57:42.246Z'
modified: '2022-04-15T01:29:04.456Z'
---

# 0021 Merge Two Sorted Lists

## The Task

## #recursion, #linked list

### Time Complexity 

&O(n)&

### Space Complexity

&O(n)&

### The Idea

In this solution, we recursively construct a third list by comparing the front element of the two lists and shrinking the selected list by one for the next step. If one of the lists is empty, we just add one of the lists to the third list.

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = (list1,list2) => {
    
    let head = new ListNode();
    
    const rec = (a,b,parent) => {
        // if one of the lists is null, assign the other to c's newest empty node
        if (!a && !b) return
        if (!a || !b) {
            a ? parent.next = a : parent.next = b;
        }
        else if (a.val < b.val) {
            let child = new ListNode(a.val);
            parent.next = child;
            rec(a.next, b, child);
        } else {
            let child = new ListNode(b.val);
            parent.next = child;
            rec(a, b.next, child);    
        }
    }
    rec(list1,list2,head);
    return head.next;
};
```

## #recursion, #linked list

### The Idea

Here we do the same, except we mutate one of the lists to contain all the nodes.

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = (a,b) => {
    if (!a || !b) return a ? a : b
    if (a.val<b.val) {
        let next = a.next;
        a.next = mergeTwoLists(next,b) 
        return a;
    } else {
        let next = b.next;
        b.next = mergeTwoLists(a, next);
        return b;
    }
};
```
