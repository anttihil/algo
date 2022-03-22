---
tags: [dynamic programming, memoization, number, top-down]
title: 0509 Fibonacci Number
created: '2022-03-22T06:16:04.118Z'
modified: '2022-03-22T06:17:46.835Z'
---

# 0509 Fibonacci Number

### The task: Return nth Fibonacci number

## #dynamic programming, #top-down, #memoization, #number

### Time Complexity: 

O(n)

### Space Complexity: 

O(n)

Since each fibonacci number depends on two previous ones, this problem has the overlapping subproblems characteristics that signals it is a dynamic programming problem.

Compare that to a situation where a number y in a series is calculated via some independent variable, x. In that case, each y could be known through x independently of other y's.

Memoization is a top down technique: We start from the nth solution and realize it is recursively dependent on n-1th and n-2th. We could just calculate purely recursively but we would be repeating the same calculations over and over again, even the basecase ones (0 and 1).

To prevent repeating, for each function call we will write down solutions to n-1 and n-2 into the memo if they do not exist there.

Then we will return their sum.

So, fibon(n) will check for fibon(n-1) and fibon(n-2) in the memo and update the memo by calling those instances.

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  let memo = new Map();

  const fibon = (k) => {
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!memo.has(k - 1)) memo.set(k - 1, fibon(k - 1));
    if (!memo.has(k - 2)) memo.set(k - 2, fibon(k - 2));
    return memo.get(k - 1) + memo.get(k - 2);
  };

  return fibon(n);
};
```

_Note:_ lower level functions (n-1 & n-2) are NOT called at level n if they are already in the memo. This makes the algorithm much faster.

## #dynamic programming, #top-down, #number

In the following _slower variation_, the function at n checks whether the case n is in the memo. If not, the function at n sets the memo[n] to be fibon(n-1) + fibon(n-2), and then return memo[n]. This is much slower because this function will call fibon(n-1) and fibon(n-2) even if those answers are already in the memo. Even though fibon(n-1) and fibon(n-2) return their solutions immediately from the memo, there is a much larger number of function calls in this alternative, +1 depth across the implicit tree of calculations.

```js
/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  let memo = new Map();
  memo.set(0, 0);
  memo.set(1, 1);
  memo.set(2, 1);
  if (memo.has(n)) {
    return memo.get(n);
  } else {
    memo.set(n, fib(n - 1) + fib(n - 2));
    return memo.get(n);
  }
};
```
