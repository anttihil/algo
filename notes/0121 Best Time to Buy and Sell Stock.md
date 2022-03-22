---
tags: [array, loop]
title: 0121 Best Time to Buy and Sell Stock
created: '2022-03-22T06:38:22.796Z'
modified: '2022-03-22T06:48:12.627Z'
---

# 0121 Best Time to Buy and Sell Stock

### The task: 

You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

### Example 1:
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```
### Example 2:
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

### Constraints:
```
1 <= prices.length <= 105
0 <= prices[i] <= 104
```
## #loop, #array

### The idea:

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
