---
tags: [expansion, loop, recursion, string]
title: 0647 Palindromic Substrings
created: '2022-03-27T05:06:24.262Z'
modified: '2022-03-30T05:42:47.382Z'
---

# 0647 Palindromic Substrings

## #expansion, #recursion, #string, #loop

### Time Complexity 

&O(n^2)&

We go through each char and contiguous pair. These will &n + n-1 = 2n-1&. That's &O(n)&. Then for each of those &2n-1& we do a palindromic check of at most &n& chars. That's &n*(2n-1)& which is &O(n^2)&.  

### Space Complexity

&O(1)&

### The Idea 

We run through each char at i and contiguous pair at [i, i+1]. For both we run a findPalindromes check that returns the number of palindromes that are centered around that index. We recursively expand and check whether boundary strings both exist and match each other. If yes, we increase palindrome count and recurse again with radius increased by 1. 

When all the recursive calls return, we return the modified result object that has been passed down to the bottom of recursive tree. 

Passing down an object means that we don't have to return and recompile the results from recursive calls. Instead, we modify the object that retains its reference through function calls. 

```js
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    let result = 0;
    for (let i = 0; i<s.length; i++) {
        result += findPalindromes(i,i,s).count;
        result += findPalindromes(i,i+1,s).count;
    }
    return result;
};

function findPalindromes(l, r, s, res = {count: 0}) {
    if (!s[l] || !s[r] || s[l] !== s[r]) return res;
    res.count++;   
    findPalindromes(l-1, r+1, s, res);
    return res;
}
```

## #dynamic programming

### The Idea 

We create a coordinate grid where each cell is (start,end) of the palindrome. We save in the cell TRUE when that interval contains a palindrome. 

The main loop is a double pointer loop where we loop through all possible pairs of indexes in the string where start and end do not get inverted in order. So, we really using the upper-right triangle of the coordinate grid for this problem. 

For each pair of start and end points we call the isPalindrome recursive function. We can do so that we first save that result in the coordinate grid and then check the grid for that pair. If the pair has TRUE in the grid, then we add it to the solution array. 

A recursive palindrome checker is easy: First, if first and last chars do not agree, it is not a palindrome and we return false. Else, we check whether its length is less than 2 or whether it is contained in the palindrome grid already. In that case, we return true. Otherwise, we call recursively the checker again but this time with first and last chars removed. (Like peeling an onion.) We save that result in the palindrome grid, and return the value (true or false).

### Time Complexity

&O(n^2)&

### Space Complexity

&O(n^2)&

```js
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    let result = 0;
    let pals = Array(s.length).fill(null).map(item => Array(s.length).fill(null));
    for (let i = s.length-1; i>=0; i--) {
        for (let j=i; j<s.length; j++) {
            pals[i][j] = isPal(i,j,s,pals) 
            if (pals[i][j]) result++
        }
    }
    return result;
};

function isPal(l,r,s,p) {
    if (s[l] === s[r]) {
        if(r-l<2 || p[l+1][r-1]) return true;
        else return p[l+1][r-1] = isPal(l+1, r-1, s, p);    
    }  else return false;
}

```

