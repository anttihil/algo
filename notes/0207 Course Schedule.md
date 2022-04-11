---
title: 0207 Course Schedule
created: '2022-04-06T01:20:10.937Z'
modified: '2022-04-06T01:58:52.004Z'
---

# 0207 Course Schedule 

## The Task

## #topological sort, #set, #array

### Time Complexity
&O(v*e*e) = O(n^3)&

We loop through each vertex at worst, because there &v-1& vertices that have no incoming edges in a connected, directed graph. (One vertex receives all edges.)

Inside the outer loop, we loop through each edge. We have to look through all the &e& prereqs to find which ones have the prior elemtns.

Within the inner loop, we have to delete an element from the graph which is saved as an array. Deleting from an array takes &O(n)& time at worst.

### Space Complexity
&O(v + v + v) = O(n)&

"Starts" saves the vertices without incoming edges.
"Freq" saves the number of incoming edges for each vertex.
"Result" saves the sorted vertices.

### The Idea

For Kahn's algorithm, we need to first find all vertices that have no incoming edges. These are course without prereqs. Intro courses. 

To do that, we can loop through prereqs and do a frequency counter array with indexes matching to course number. The value at index tells the number of prereqs.

For any 0 in the frequency counter, we add it to a set, a stack or a queue. (Does not matter for this algorithm.)

Then we run a loop while there are items in the set/stack/queue.

1. Pop the top element. 
2. Add it to the sorted list, because it must be a first element having no prereqs.
3. Loop through all the edges (prereqs).
    1. If we find a course that has the current element as a prereq, delete that edge.
    2. Decrease the frequency counter for that course because we eliminated one prereq for it.
    3. If frequency counter for that course has gone 0, add the element to the set/stack/queue. The reason: All of its prereqs have been settled, and now we can use it as a further prereq. *This is the key idea in addition to the initial stack building.*
    4. Remember to decrement loop counter if you delete an element in a list you are looping over.
4. If the input graph has remaining edges (unresolved prereqs), it must have a loop in it. If not, we can return the sorted list. 

```js
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    // this is based on Kahn's algorithm
    
    // first we find a set of courses which have no prerequisites
    
    let starts = [];
    let freq = Array(numCourses).fill(0);
    for (let [course, prereq] of prerequisites) {
        freq[course] += 1;
    }
    
    for (let i=0; i<freq.length; i++) {
        if (freq[i] === 0) {
            starts.push(i);       
        }
    }
    console.log(starts);
    // then we run the algorithm
    
    let sorted = [];
    
    //let keys = starts.keys();
    let current;
    
    let course;
    let prereq;
    //console.log(freq);
    
    while(starts.length) {
        current = starts.pop();
        sorted.push(current);
        for (let i=0; i<prerequisites.length; i++) {
            [course, prereq] = prerequisites[i];
            if (prereq === current) {
                //console.log("prereq", prereq, "found an accessible course", course);
                prerequisites.splice(i,1);
                freq[course]--;
                //console.log("frequency for", course, freq[course]);
                if (!freq[course]) {
                    starts.push(course);
                }
                i--;
            }
        }
    }
    return prerequisites.length ? false : true
};
```


