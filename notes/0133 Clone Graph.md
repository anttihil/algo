---
tags: [breadth first search, depth first search, graph, hash map]
title: 0133 Clone Graph
created: '2022-04-05T22:25:38.012Z'
modified: '2022-04-05T23:40:43.463Z'
---

# 0133 Clone Graph

## The Task

## #depth first search, #hash map, #graph

### Time Complexity

&O(2(v+e)) = O(v+e)& 

We traverse the graph twice.

### Space Complexity

&O(v^2)& 

Each node has at most v-1 neighbors. We store v nodes in the hash map. This means that hash map takes v(v-1) space. The stack takes v-1 neighbors at worst which does not affect the the dominant order.

### The Idea

We do two DFS's. First, we visit the nodes in depth and at each node create a new entry in the hash map where the key is node.val and the value is the new Node(val). This way we can update the saved nodes when we visit them the second time.

During the second traversal, we first make sure the Node is not already visited. If not, we take its neighbors and add them to the Node.neighbors array. Also, if the neighbor is not visited we will add it to the stack to be visited.  

```js
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    
    if(!node) return node;
    
    let clones = new Map();
    
    let stack = [node];
    
    while (stack.length) {
        let current = stack.pop();
        clones.set(current.val, new Node(current.val));
        for (let nei of current.neighbors) {
            if (!clones.has(nei.val)) {
                stack.push(nei);
            }
        }
        
    }
    stack = [node];
    let visited = new Map();
    
    while (stack.length) {
        let current = stack.pop();
        if (!visited.has(current.val)) {
            let clone = clones.get(current.val);
            for (let nei of current.neighbors) {
                clone.neighbors.push(clones.get(nei.val));
                if (!visited.has(nei.val)) {
                    stack.push(nei);
                }
            }
            visited.set(current.val, true);
        }
        
    }
    return clones.get(node.val);
    
};
```

## #breadth first search, #hash map, #graph

### Time Complexity 

&O(v+e)&

### Space Complexity

&O(v^2)&

### The Idea

This is a very similar solution, but certain steps have been combined.

We only have one hash map, "clones" that doubles as the repository of the *cloned* nodes themselves but also as the list of visited original nodes. 

The basic idea is that we keep two variables: current original node and current clone.

We also have a queue because we are using BFS. 

We take the current node (from the original graph) and then get its clone from the hash map (if it exists).

We loop over each neighbor of the current node. 

If a neighbor has not been cloned, we do two things:
1. We create a clone for it and put it in the hash map. (Leaving neighbors empty.)
2. We also add it to the queue to be explored.

Now that we are assured that the neighbor's clone exists, we will it to the neighbors of the current clone. 

This is the thought process further reduced: 
1. You are at the current clone
2. Some of its neighbors have not yet been cloned. So, we must create them first.
3. Iff a neighbor has not been cloned, we visit them next. (Because they are not visited, their neighbors have not been assigned. That's also the only reason we should visit them to avoid duplicates.)
4. Now, since we know the neighbor exists, we add it to the neighbors of the current clone. 
5. We repeat this until the queue runs out. Since no visited node gets added, we know the process terminates.

At its bottom, this boils down to: While still at current clone, we must create its neighboring clones. Then we can add them to the current clone's neighbors. The neighboring clones neighbor's are added when we visit them. No node is visited twice, so for each clone we only add its neighbors once.

```js
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    
    if(!node) return node;
    
    let clones = new Map();
    clones.set(node.val, new Node(node.val, []));
    let q = [node];
    let curClone;
    let current;
    
    while (q.length) {
        current = q.pop();
        curClone = clones.get(current.val);
 
        for (let nei of current.neighbors) {
            if (!clones.has(nei.val)) {
                clones.set(nei.val, new Node(nei.val, []));
                q.push(nei);
            }
            curClone.neighbors.push(clones.get(nei.val));
        } 
    }
    return clones.get(node.val);
};
```


