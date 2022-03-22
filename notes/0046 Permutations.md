---
tags: [backtracking, recursion]
title: 0046 Permutations
created: '2022-03-22T05:54:35.297Z'
modified: '2022-03-22T06:18:13.894Z'
---

# 0046 Permutations

Return an array of arrays of permutations of n numbers.

## #backtracking, #recursion, #array

The idea: This is a backtracking problem.

_Overall Function_

    We need to keep track of both available numbers (say, of 1,2,3,4) and current permutation.

_Basecase_

    When a permutation is complete (no available numbers), we are at the base case.

    There we copy the completed, current permutation to the array of completed permutations

_Recursive step_

For each level of recursion, we add one available number to current permutation and remove it from available numbers.

After the recursive function resolves, then we remove the last/latest item in the current permutation. This is the back-tracking step. E.g. after we check 123, we remove 3 before we move back to the level of 12.

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let perms = [];

  const permutation = (availNums, current) => {
    //console.log("current permutation", current)
    //console.log("availNums", availNums);

    if (!availNums.length) {
      // copy array so its contents do not get deleted by .pop() below
      perms.push(Array.from(current));
    } else {
      // iterate through available numbers
      for (let i = 0; i < availNums.length; i++) {
        // add ith available number to current permutation
        current.push(availNums[i]);

        // copy array (to detach reference)
        let limited = Array.from(availNums);
        limited.splice(i, 1);

        // recursively search one level down but with limited array of available numbers
        permutation(limited, current);

        //backtrack by removing the deepest node from array
        current.pop();
      }
    }
  };
  permutation(nums, []);
  return perms;
};
```
