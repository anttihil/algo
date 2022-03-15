# Leetcode exercises

## Recursion

### $77 Combinations

Problem: Return an array of arrays of k-combinations of n items.

Example: [1,2,3,4] -> [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

Solution:

Set a combinations array.
Set another temp array for the current combination being built.

```js
var combine = function (n, k) {
  let combs = [];
  let current = [];

  const reverse = (combs, current, start, n, k) => {
    if (k === 0) {
      //console.log("bottom", current);
      combs.push(Array.from(current));
      //console.log("combs at bottom", combs);
      return;
    }

    for (let i = start; i <= n; i++) {
      current.push(i);
      //console.log("before recursion", current);
      reverse(combs, current, i + 1, n, k - 1);
      current.pop();
      //console.log("after recursion", current);
    }
  };

  reverse(combs, current, 1, n, k);
  //console.log("answer", combs);
  return combs;
};
```

The idea is that the for loop adds an index to the current combination and then
calls the reverse function again with index + 1

**Example: n=4, k=3**

_Bottom stack: i = start = 1, k = 3_

_2nd stack level: i = 2, k = 2_

_3rd stack level: i = 3, k = 1_

    So far we got the current combination as 123

    The function is called one more time with start=4, k=0

_4th stack level: start = 4, k=0_

    The i does not matter here, because k = 0 which is the base case.
    (There cannot be a 0-combination)

    At the base case, we just push the current combination to combination array.

    We have to use Array.from here because we want to preserve current combination array for further editing but we need a copy that does not carry the reference.

    So, the 4th level stack resolves.

_We are back at the 3rd stack level within the loop._

    Now, we pop out the last member of the current combination. In this case, 3.

    The current combination is 12 (because the length is one short of 3 we see that we are not done with 3rd stack level)

    We increment the loop index by one, i = 4. k is still 1.

    We push the 4 to current combination: 124

    Reverse is called with i=4, k=0

_4th stack level again:_

    Now, 124 is pushed to combs.

_3rd stack level:_

    Current combination is pop()'d

    But the loop runs out at i= 4 = n, so we have to go back to

_2nd stack level:_

    current combination is 12 when the reverse from 3rd stack level resolves.
    Then, 2 is popped off from current combination.

_We are back to stack level 1._

    Loop i is incremented to 3.
    Reverse is called with i=3, k=2

_The recursion continues as follows:_

    1
    13
    134
    push(134)
    14
    nothing because reverse is called with i=5, k=1 so neither the base case (k=0) or the loop (i<=5) kicks in.
    2
    23
    234
    push(234)
    3
    34
    nothing b/c i=5, k=1
    4
    nothing b/c i=5, k=2

### $46 Permutations

This is another backtracking problem.

Return an array of arrays of permutations of n numbers.

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

### $784 Letter Case Permutation

TimeComplexity: O(2**n) (very slow, because the function has to recurse twice. Very much the subset problem)
SpaceComplexity: O(2**n) (binary tree)

Idea: recursive solution a la subsets

the recursive function takes as input: the array of modified chars (where case has been changed) and the array of remaining chars

It does not return anything, instead it updates the permutations array when it hits the base case.

Basecase: array of chars is trivial (zero length)

Recursive case:

First check for integers at the beginning of the array.
For each integer, push it into the array of processed chars.
Then splice off those integers from the array of remaining chars.

After that, recurse the permute function twice with processed chars concat w/ first char that has been changed to uppercase/lowercase, and the first member of rest has been sliced off.

```js
/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  let perms = [];
  let arr = s.split("");

  const subset = (soFar, rest) => {
    //console.log("at fresh recurse call (soFar, rest)", [soFar,rest])
    if (rest.length === 0) {
      perms.push(soFar.join(""));
    } else {
      // check chars for integers
      let numberQ = 0;
      let i = 0;
      let digitsMoved = soFar;
      while (rest[i] && rest[i].match(/\d/)) {
        digitsMoved.push(rest[i]);
        numberQ++;
        i++;
      }
      rest.splice(0, numberQ);
      if (rest.length === 0) {
        perms.push(digitsMoved.join(""));
      } else {
        // console.log("rest before next recurse", rest);
        subset(digitsMoved.concat([rest[0].toUpperCase()]), rest.slice(1));
        subset(digitsMoved.concat([rest[0].toLowerCase()]), rest.slice(1));
      }
    }
  };
  subset([], arr);
  return perms;
};
```

## Dynamic Programming

### $5 Longest Palindromic Substring

timeComplexity = O(n**2) (because of the Cartesian product grid, and double embedded loop)
spaceComplexity = O(n**2) (because of the grid)

```js
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length === 1) return s;

  let lpsStart = 0;
  let lpsLength = 1;
  let grid = Array(s.length)
    .fill(null)
    .map((x) => Array(s.length).fill(false));

  for (let i = 0; i < s.length; i++) {
    grid[i][i] = true;
  }

  //console.log(grid);

  for (let end = 0; end < s.length; end++) {
    for (let start = end - 1; start >= 0; start--) {
      //console.log("[start,end]:" [start, end]);
      if (s[end] === s[start]) {
        if (end - start === 1 || grid[start + 1][end - 1]) {
          grid[start][end] = true;
          let len = end - start + 1;
          if (len > lpsLength) {
            lpsLength = len;
            lpsStart = start;
          }
        }
      }
    }
  }

  //console.log(grid);

  return s.slice(lpsStart, lpsStart + lpsLength);
};
```

## $70, Climbing stairs

Time: O(n)
Space: O(n)

The idea: We have n steps left. The constraint is that we can either take 1 or 2 steps at a time. We can calculate the ways in which we take n steps by recursively calling the functions for n-1 and n-2 and return their _sum_.

**The ways to take n steps === the ways to take n-1 + the ways to take n-2.**

The problem with this approach is the time is O(2\*\*n). (Binary tree)

We can alleviate this by memoaizing the results.

Create a Map to hold the memo items.
**Note:** You must initialize the map with base cases. Otherwise, the recursive calls return undefined.

On each recursive call:

First, check if n steps are already in Map and return it.
Second, set Map for n steps to be the sum of recurse(n-1) + recurse(n-2)
Third, return Map.get(n steps)

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  let map = new Map();
  map.set(1, 1);
  map.set(2, 2);
  const recurse = (steps) => {
    //console.log("steps left:", steps);
    if (map.has(steps)) {
      //console.log(steps, "already in memo:", memo);
      return map.get(steps);
    }
    map.set(steps, recurse(steps - 1) + recurse(steps - 2));
    //console.log(steps, "added to memo", memo);
    return map.get(steps);
  };
  return recurse(n, map);
};
```
