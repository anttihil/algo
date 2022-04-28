---
tags: [greedy, hash map, loop, priority queue, recursion]
title: 0621 Task Scheduler
created: '2022-04-11T05:22:24.426Z'
modified: '2022-04-11T05:57:20.713Z'
---

# 0621 Task Scheduler 


## #greedy, #hash map, #loop

### Time Complexity

&O(n)& 

### Space Complexity

&O(1)&

Only an alphabet sized hash map.

### The Idea

After analyzing examples, we should realize that in the default case the tasks are divided into cycles whose length is n+1. 

Each cycle should start with the most frequent task, because those are going to be the bottle neck. We maximize locally the execution of the most frequent task. This is a scheduling task, and a greedy algorithm works well in many scheduling tasks.

For example, 
A..A..A 
There are n=2 spots between A's. This will be the minimal way of packing the tasks if there are only A's. Because A is the most frequent task, the other tasks won't increase the number of cycles required. They can only lengthen the cycles. 

The trickiest point is that if there is another task that has the same frequency as A, it will also have to be executed once after the last A. 

Thus, we will have to count occurences of maxCount among tasks. 

The formula: number of cycles with idles * min cycle length + length of the final cycle

Min cycle length = n+1 
Explanation: A new "A" can be executed only after n idles/other tasks.)

number of cycles with idles = maxcount -1 
Explanation: There are maxCount cycles. The last group does not need idles so it is excluded.

length of the final group is the number of tasks that have the maxCount

Finally, we should note that it is possible that there are so many different tasks that no idling is necessary. In that case, 

Result = Math.max(tasks.length, (maxCount-1)*(n+1) + tasksWithMaxCount

```js
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    
    let map = new Map();
    let max = null;
    let maxCount = 0;
    
    for (let t of tasks) {
        map.set(t, map.get(t) + 1 || 1);
        if (map.get(t) > maxCount) {
            maxCount = map.get(t);
            max = t;
        }
    }
    
    // There must be maxCount amount of cycles with n+1 length. 
    // Each group starts with the most frequent task. 
    // Because of the cooldown requirement, there will be n required spots after every most freq task, 
    // except the last one
    // A..A..A 
    // Those dots will be filled either with tasks or idles.
    // This will be the minimum length, unless there are other tasks that have the same amount as the most frequent task
    // Those equinumerous tasks cannot be fitted into the dots between A's. 
    // They must have one per each task in the last cycle after the last A.
    // Finally, if it happens that all dots are filled and there is still left over, we return the total amount of tasks.
    // No idles required if all the cooldown requirements are met. (This is possible when the variety of tasks exceeds the required idle spots.)
    
    let tasksWithMaxC = 0;    
    for (let [key,value] of map) {
        if (value === maxCount) tasksWithMaxC++; 
    }

    // the other groups have the length of n+1 to accommodate an idle
    return Math.max(tasks.length, (maxCount-1)*(n+1) + tasksWithMaxC)
};

```

## #priority queue, #recursion, #hash map

### Time Complexity

&O(n)&

The outer loop runs only constant times at most because there is only one task in the queue per Latin character.

### Space Complexity

&O(1)&

The hash map takes only constant space. The priority queue is the same.

### The Idea

The point here is to use a priority queue. We always prioritize the task with the highest frequency. We run a loop until the priority queue is empty. 

Inside the outer loop, we have another loop that pulls tasks from the queue until a cycle of n+1 processes is done or the queue has run out of tasks. We increment the result for each tick.

After the cycle is over, we add the same tasks back to the queue with one less priority weight. (If 0, we don't add.) 

We also break after this refill, if there are no more tasks to be done. 

That break statement only kicks in the last cycle. Otherwise we are still proceeding, and we check whether there are any cycle processes that are left over from task processing. We add those processes to the result number. (These are the idles.)

Finally, we reset cycle back to n+1 and loop again.

```js
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {
    
    let map = new Map();
    
    for (let t of tasks) {
        map.set(t, map.get(t) + 1 || 1)        
    }
    
    let pq = new PriorityQueue();
    
    for (let [key,value] of map) {
        pq.enqueue(key, value);
    }
    
    let cycle = n+1;
    let current = null;
    let cooldown = [];
    let result = 0;
    
    while(pq.values.length) {       
        
        // run until either the cycle runs out or there are no more tasks
        while(cycle>0 && pq.values.length) {
            //take the most numerous task from scheduling queue
            current = pq.dequeue();
            
            //put it into cooldown list
            cooldown.push(current);
            
            //increment result by 1 (one task done)
            result++;
            
            // decrease cycle by 1
            cycle--;
        }
        
        // refill scheduling queue with the items that have been put into cooldown
        for (let item of cooldown) {
            if (item.p > 1) pq.enqueue(item.val, item.p-1)
        }
        
        // reset cooldown
        cooldown = [];
        
        // if scheduling queue is empty after refilling, we are done with all the tasks
        if (!pq.values.length) break;
        
        // add remainder of cycle length if we ran out of tasks temporarily
        result += cycle;
        
        // reset cycle
        cycle = n+1;
    }
    return result;
};

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, p) {
        let heap = this.values;
        
        // create node
        let node = new Node(val, p);
  
        // add it to the end
        heap.push(node);
        
        function findParent(i) {return Math.floor((i-1)/2)}
        
        function bubbleUp(i) {
        
        let parent = findParent(i);
        
        // if node is bigger than parent, switch and recurse
        if (heap[i].p > heap[parent]?.p) {
            [heap[i], heap[parent]] = [heap[parent], heap[i]];
            bubbleUp(parent);
        } 
        
        // bubbleUp
        bubbleUp(heap.length-1); 
        }
    }
    
    dequeue() {
        let heap = this.values;
        
        // if heap empty return null
        if (!heap.length) return null;
        
        // switch last and first
        let last = heap.length -1;
        [heap[0], heap[last]] = [heap[last], heap[0]];
        
        // pop last
        let result = heap.pop();
        
        // bubbleDown the first node
        function children(i) {
            return [2*i+1, 2*i+2]
        }
        function bubbleDown(i) {
            let [first,second] = children(i);
            if (heap[first]?.p > heap[i]?.p) {
                [heap[first], heap[i]] = [heap[i], heap[first]];
                bubbleDown(first);
            }
            if (heap[second]?.p > heap[i]?.p) {
                [heap[second], heap[i]] = [heap[i], heap[second]];
                bubbleDown(second);
            }
        }
        bubbleDown(0);
        //return result
        return result;
    }
}

class Node {
    constructor(val, p) {
        this.val = val;
        this.p = p;
    }
}

```
