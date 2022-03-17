# Leetcode exercises

Problems are added in the order that I have solved them. If you are interested in searching a LeetCode problem by its number, you can Ctrl+F with a $ tag. For example, $77 denotes Combinations problem.

Each problem can exhibit multiple problem/solution patterns. These are denoted by an @ tag. For example, "@dynamic programming" section shows a dynamic programming solution to the problem.

One problem can have multiple solutions each with their respective @tags. This means it is easier to look through, say, only recursive solution patterns.

## @77 Combinations

Problem: Return an array of arrays of k-combinations of n items.

Example: [1,2,3,4] -> [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

### #backtracking, #recursion

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

## @46 Permutations

Return an array of arrays of permutations of n numbers.

### #backtracking, #recursion

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

## @784 Letter Case Permutation

### #backtracking, #recursion, #subset

Time Complexity: O(2\*\*n) (very slow, because the function has to recurse twice. Very much the subset problem)

Space Complexity: O(2\*\*n) (binary tree)

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

## @5 Longest Palindromic Substring

### #dynamic programming, #bottom-up

Time Complexity = O(n\*\*2) (because of the Cartesian product grid, and double embedded loop)

Space Complexity = O(n\*\*2) (because of the grid)

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

## @70 Climbing stairs

The task: We have n steps left. The constraint is that we can either take 1 or 2 steps at a time.

### #dynamic programming, #top-down

Time Complexity: O(n)

Space Complexity: O(n)

The idea: We can calculate the ways in which we take n steps by recursively calling the functions for n-1 and n-2 and return their _sum_.

**The ways to take n steps === (the ways to take n-1) + (the ways to take n-2)**

The problem with this approach is the time is O(2\*\*n). (Binary tree)

We can alleviate this by memoizing the results.

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

## @198 House Robber

The setup: An array of numbers, each of which denote an amount of money that can be robbed from a house. The constraints are each house can be robber once and two adjacent houses cannot be robbed.

The goal: Maximize the amount of money. Return the maximum amount as integer.

### #dynamic programming, #bottom-up

Time Complexity: O(n)

Space Complexity: O(n)

The idea: This is a dynamic programming problem because given a number of houses to choose from the decision to rob the latest depends on the previous decisions. This is the "overlapping subproblems" characteristics.

I started by sketching a chart.

| 1st | 2nd | 3rd | 4th | Max |
| --- | --- | --- | --- | --- |
| 5   |     |     |     | 5   |
| 5   | 9   |     |     | 9   |
| 5   | 9   | 7   |     | 12  |
| 5   | 9   | 7   | 1   | 12  |

The new max after adding a new house can be calculated on the basis of two previous solutions.
For example, if we add 7 value house to 5 and 9, we know that 12 is the max because we cannot rob adjacent houses 9 and 7. But if the new house would have been, say, 1, then 9 would be the max.

In effect, we need to compare the answers from two previous problem sizes.
rob(n) = Math.max(rob(n-1), rob(n-2) + nums[0])
The new house's value can only be added to rob(n-2) where the last house has not been robbed due to the adjacency constraint.
However, it is possible that the solution where the last house has been robbed (n-1) is bigger.
That's why we compare those two scenarios and take the max.

Note that this solution comes from building the optimal solution bottom up, so we know that there is no other pattern that can emerge.

The structure of this problem is strongly analogous to Fibonacci sequence: F(n) = F(n-1) + F(n-2) with the exception that we are calculating max, instead of straigth up sum.

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // rob(n) = Math.max(rob(n-1), rob(n-2)+nums[n])
  if (nums.length === 1) return nums;
  let earlier = 0;
  let later = 0;
  let now = 0;
  for (let i = 0; i < nums.length; i++) {
    earlier = later;
    later = now;
    now = Math.max(earlier + nums[i], later);
  }
  return now;
};
```

## @509 Fibonacci Number

The task: Return nth Fibonacci number

### #dynamic programming, #top-down, #memoization

Time Complexity: O(n)

Space Complexity: O(n)

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

### #dynamic Programming, #top-down

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

### @120 Triangle

Given a triangle array, return the minimum path sum from top to bottom.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

Example 1:

Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: The triangle looks like:
2
3 4
6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).

Example 2:

Input: triangle = [[-10]]
Output: -10

Constraints:

    1 <= triangle.length <= 200
    triangle[0].length == 1
    triangle[i].length == triangle[i - 1].length + 1
    -104 <= triangle[i][j] <= 104

Follow up: Could you do this using only O(n) extra space, where n is the total number of rows in the triangle?

### #dynamic Programming, #bottom-up

Time Complexity: O(n^2)

Space Complexity: O(n)

If we know the minimum distances to each of the nodes on the n-1 level, then we can create the minimum distances to reach each of the nodes on the n based on those levels.

The minimum distance to reach a node on level n == _the minimum of (min distance to left parent + node value) and (min distance to right parent + node value)_

The edge nodes are special cases because they have only one parent each.

The formula is:
if (index == 0) return n-1[index] + n[index]
if (index == n.length-1) return n-1[index]
Otherwise, return Math.min(n-1[index] + n[index], n-1[index-1] + n[index])

```js
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  if (triangle.length === 1) return triangle[0][0];

  let prev = [];
  let current = [triangle[0][0]];
  let min = 0;

  for (let i = 1; i < triangle.length; i++) {
    prev = current;
    current = triangle[i].map((num, index) => {
      if (index === 0) return num + prev[index];
      if (index === triangle[i].length - 1) return num + prev[index - 1];
      return Math.min(num + prev[index - 1], num + prev[index]);
    });
    min = Math.min(...current);
  }
  return min;
};
```

## @231 Power of Two

Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2x.

### #loop

Time Complexity: O(n)
Space Complexity: O(1)

Simple. Just convert the number to a binary string with .toString(2). Then make sure that the leading number is 1 and rest 0s.

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  let binary = n.toString(2);
  if (binary[0] == 0) return false;
  for (let i = 1; i < binary.length; i++) {
    if (binary[i] == 1) return false;
  }
  return true;
};
```

### #bit manipulation

Two facts:

1. any power of 2 is bigger than 0

2. any power of 2 has exactly 1 bit with value 1 at the front and the rest are 0s.
   This means that if substract 1 from that number and do a bitwise AND, we will get a 0 if the number is a power of 2.

Bitwise AND compares to bits at a position and returns 1 only if they are both 1. Otherwise, 0.

Example with 16:
10000 (16 in binary)
01111 (15 in binary)
00000 (bitwise AND of 16 and 15)

```js
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  return n > 0 && !(n & (n - 1));
};
```

## @191 Number of 1 bits

Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).

### #built-in method, #string, #loop

Time complexity: O(n)

Space complexity: O(1)

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let number = 0;
  let binary = n.toString(2);
  for (let char of binary) {
    if (char == 1) number++;
  }
  return number;
};
```

### #bit manipulation

Time complexity: O(1)

Space complexity: O(1)

The idea is that n & n-1 will reduce the bits by one because in n-1 one bit will shift to the right.
1010 -1 == 1001

Then we get 1010 & 1001 = 1000. Count gets updated by 1.

We iterate once more with 1000 & 0111, and the last bit disappears. Count gets updated by 1 again.

Total bits = 2, which matches n = 1010.

```js
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function (n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};
```

## @1 Two Sum

### #hash map

Time Complexity: O(n)

Space Complexity: O(n)

This would be easy as well with O(n^2) time. One could just have two pointers searching through all pairs. Outer pointer moves from start to left, inner pointer moves always from outer pointer to the end.

Introducing a hash map we can save the difference between target and current number as a memo key, and then save the index as the value. For each new number, we first check whether the current number exists as a key in the memo (because target - prev = current).

If yes, return current index and previous index.

If not, save (target - current number) as a key in the memo.

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) return [i, map.get(target - nums[i])];
    map.set(nums[i], i);
  }
};
```

## @217 Contains Duplicates

The problem:

Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

### #hash map

Time Complexity: O(n)

Space Complexity: O(n)

The idea:

Save visited numbers to a hash map. If any new number occurs in the map, we know that it is a duplicate.

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  let map = new Map();

  for (let num of nums) {
    if (map.has(num)) return true;
    map.set(num, true);
  }
  return false;
};
```

## @121 Best Time to Buy and Sell Stock

You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104

### #loop

The idea:

Start from the smallest scenario in which buying and selling is possible.

Update these variables while looping.

```js
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length === 1) return 0;
  let smallestSoFar = prices[0];
  let profit = 0;
  let i = 1;
  while (i < prices.length) {
    profit = Math.max(prices[i] - smallestSoFar, profit);
    smallestSoFar = Math.min(smallestSoFar, prices[i]);
    i++;
  }
  return profit >= 0 ? profit : 0;
};
```

## @242 Valid Anagram

The task: Given two strings s and t, return true if anagram, false otherwise.

### #hash map, #loop

This was my first solution.

First, check the lengths. If not same, return false.

Build one hash map of the frequencies of chars in string s.

Then start building a hash map of frequencies in t.
If a char in t that does not exist in s, return false
Update hash map for t.
If a frequency in t is greater than in s, return false.

This works because any difference in char means that some frequency in t must be higher.
Even if we have not checked all chars in t, we know that once a frequency in s (completed map) is exceeded t must be a non-anagram.

While we are in the midst of checking, we cannot conclude falsity from a _lower_ frequency in t simply because the checking is not complete yet.

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let mapS = new Map();
  let mapT = new Map();
  for (let char of s) {
    let val = mapS.get(char);
    val ? mapS.set(char, val + 1) : mapS.set(char, 1);
  }
  for (let char of t) {
    if (mapS.has(char)) {
      let val = mapT.get(char);
      val ? mapT.set(char, val + 1) : mapT.set(char, 1);
      if (mapS.get(char) < mapT.get(char)) return false;
    } else return false;
  }
  return true;
};
```

### #hash, #loop

An alternative, simpler solution that uses a single frequency hash map. With string s, we add frequencies to the map. With the second string t, we substract frequencies from the map.

If we find a char in t which is not in the map (val === undefined) or whose frequency is already 0, then we will return false.

Otherwise, return true. We can do this because if the lengths of strings are the same, string s is going to have a higher frequency at one char or a char that does not exist in t. Thus, val above in the frequency check is going to hit 0 or undefined, respectively.

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  let freq = new Map();
  for (let char of s) {
    let val = freq.get(char);
    val ? freq.set(char, val + 1) : freq.set(char, 1);
  }
  for (let char of t) {
    let val = freq.get(char);
    if (val) freq.set(char, val - 1);
    else return false;
  }
  return true;
};
```
