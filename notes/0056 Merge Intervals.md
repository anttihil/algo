---
tags: [loop, sort]
title: 0056 Merge Intervals
created: '2022-03-23T03:43:06.047Z'
modified: '2022-03-23T03:50:11.502Z'
---

# 0056 Merge Intervals

## #loop, #sort, #array

### The Idea

This problem is easy if the input array is sorted first. This ensures that intervals are sorted in ascending order by their starting point. We don't have to check how the beginning of arrays are relative to each other. We know that there are two options: either the two arrays overlap (in which case they will be merged) or not (in which case the current array is pushed straight to the answer separately).

Arrays are separate when the end of the previous is smaller than the start of the current one. They overlap when that is not true (merely sharing a point counts as overlap). 

A neat trick in the below answer is the merging: We edit the previous item (last item in the stack) by choosing maximum of the endpoints of the two overlapping arrays.

```js
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (intervals.length === 1) return intervals;
    
    intervals.sort((a,b) => a[0] - b[0]);

    let ans = [intervals[0]];
    
    for (let i=1; i<intervals.length; i++) {
        //console.log("index:", i, "ans:", ans);
        let pop = ans.length-1
        
        let prevStart = ans[pop][0];
        let prevEnd = ans[pop][1];
        
        let curStart = intervals[i][0];
        let curEnd = intervals[i][1];
        
        //console.log("prev", [prevStart, prevEnd]);
        //console.log("cur", [curStart, curEnd]);
        
        if (prevEnd < curStart) {
            ans.push([curStart, curEnd])
        } else {
            ans[pop][1] = Math.max(prevEnd, curEnd);
        }
        
    }
    return ans;
};
```
