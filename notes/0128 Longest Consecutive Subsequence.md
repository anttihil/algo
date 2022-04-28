---
title: 0128 Longest Consecutive Subsequence
created: '2022-04-23T18:47:02.253Z'
modified: '2022-04-23T19:16:50.335Z'
---

# 0128 Longest Consecutive Subsequence

## The Task

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in &O(n)& time.

### Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

### Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

### Constraints:

    0 <= nums.length <= 105
    -109 <= nums[i] <= 109

## #union find, #array

### Time Complexity

&O(n)&

### Space Complexity

&O(n)&

### The Idea

We can construct a union find datastructure that has the length of the input numbers. Then we can assign a hash map that maps each input number to an index in the ids of the union find. 

The point is that if the input contains a n and n+1 or n-1, then we can unite their groups in UF data structure. This takes only O(1) time. We can keep track of the max size among groups every time we unite them. 

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    if (nums.length === 0) return 0;
    
    let uf = new UnionFind(nums.length);
    
    let map = new Map();
    
    for (let i = 0; i<nums.length; i++) {
        map.set(nums[i], i);        
    }
    
    for (let n of nums) {
        if (map.has(n + 1)) { 
            uf.unite(map.get(n), map.get(n+1));
        }
        if (map.has(n - 1)) {
            uf.unite(map.get(n), map.get(n-1));
        }
    }
    return uf.maxSize;
};

class UnionFind {
  constructor(n) {
    this.id = [];
    this.sizes = [];
    this.maxSize = 1;
    for (let i = 0; i < n; i++) {
      this.id[i] = i;
      this.sizes[i] = 1;
    }
  }
  find(p) {
    let root = p;
    
    while (root != this.id[root]) root = this.id[root];

    while (p != root) {
      let next = this.id[p];
      this.id[p] = root;
      p = next;
    }
    return root;
  }
  unite(p, q) {
    if (this.connected(p, q)) return;

    let root1 = this.find(p);
    let root2 = this.find(q);

    if (this.sizes[root1] < this.sizes[root2]) {
        this.id[root1] = root2;
        this.sizes[root2] += this.sizes[root1];
        this.sizes[root1] = 0;
        this.maxSize = Math.max(this.maxSize, this.sizes[root2]);
    } else {
        this.id[root2] = root1;
        this.sizes[root1] += this.sizes[root2];
        this.sizes[root2] = 0;
        this.maxSize = Math.max(this.maxSize, this.sizes[root1]);
    }
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }
}
```

## #set

### Time Complexity 

&O(n)&

### Space Complexity

&O(n)&

### The Idea



```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    let set = new Set();
    
    let max = 0;
    
    for (let n of nums) {
        set.add(n);
    }
    
    for (let n of set) {
        if (!set.has(n-1)) {
            let len = 0;
            let current = n;
            while (set.has(current)) {
                len++;
                max = Math.max(max, len);
                current++;
            }
        }
    }
    return max;
};
```
