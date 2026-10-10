const problems = {

  Arrays: {
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and a target, return indices of the two numbers such that they add up to the target.",
    input: `nums = [2,7,11,15]
target = 9`,
    output: `[0,1]`,
  },


  Strings: {
    title: "Reverse String",
    difficulty: "Easy",
    description:
      "Write a function that reverses a string.",
    input: `hello`,
    output: `olleh`,
  },


  Searching: {
    title: "Binary Search",
    difficulty: "Easy",
    description:
      "Given a sorted array, search for a target element using Binary Search.",
    input: `Array = [1,2,3,4,5]
Target = 3`,
    output: `2`,
  },


  Sorting: {
    title: "Merge Sort",
    difficulty: "Medium",
    description:
      "Sort an array using the Divide and Conquer Merge Sort algorithm.",
    input: `5 2 8 1 4`,
    output: `1 2 4 5 8`,
  },


  "Linked List": {
    title: "Reverse Linked List",
    difficulty: "Medium",
    description:
      "Reverse a singly linked list and return the reversed list.",
    input: `1 → 2 → 3 → 4 → 5`,
    output: `5 → 4 → 3 → 2 → 1`,
  },


  "Stack & Queue": {
    title: "Valid Parentheses",
    difficulty: "Easy",
    description:
      "Determine whether the brackets in a string are correctly matched.",
    input: `()[]{}`,
    output: `True`,
  },


  Trees: {
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    description:
      "Find the maximum depth of a binary tree.",
    input: `[3,9,20,null,null,15,7]`,
    output: `3`,
  },


  Graphs: {
    title: "Number of Islands",
    difficulty: "Medium",
    description:
      "Count the number of islands in a 2D grid.",
    input: `11000
11000
00100
00011`,
    output: `3`,
  },


  "Dynamic Programming": {
    title: "Climbing Stairs",
    difficulty: "Easy",
    description:
      "Find the number of ways to climb N stairs when you can take 1 or 2 steps.",
    input: `n = 5`,
    output: `8`,
  },


  "Greedy Algorithms": {
    title: "Activity Selection",
    difficulty: "Medium",
    description:
      "Select maximum number of non-overlapping activities.",
    input: `Start = [1,3,0,5,8]
End = [2,4,6,7,9]`,
    output: `4 Activities`,
  },


  Backtracking: {
    title: "N Queens",
    difficulty: "Hard",
    description:
      "Place N queens on an N×N chessboard so that no two queens attack each other.",
    input: `N = 4`,
    output: `2 Solutions`,
  },


  "Binary Search": {
    title: "Search Insert Position",
    difficulty: "Easy",
    description:
      "Find the index where target should be inserted in a sorted array.",
    input: `nums = [1,3,5,6]
target = 5`,
    output: `2`,
  },


  "Hash Table": {
    title: "Contains Duplicate",
    difficulty: "Easy",
    description:
      "Check whether any value appears at least twice in an array.",
    input: `nums = [1,2,3,1]`,
    output: `True`,
  },


  "Two Pointer": {
    title: "Container With Most Water",
    difficulty: "Medium",
    description:
      "Find two lines that together with the x-axis form a container holding the most water.",
    input: `[1,8,6,2,5,4,8,3,7]`,
    output: `49`,
  },


  "Sliding Window": {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description:
      "Find the length of the longest substring without repeating characters.",
    input: `abcabcbb`,
    output: `3`,
  },


  Heap: {
    title: "Kth Largest Element",
    difficulty: "Medium",
    description:
      "Find the kth largest element in an unsorted array.",
    input: `nums=[3,2,1,5,6,4]
k=2`,
    output: `5`,
  },


  "Trie": {
    title: "Implement Trie",
    difficulty: "Medium",
    description:
      "Implement a Trie data structure with insert and search operations.",
    input: `insert("apple")`,
    output: `true`,
  },


  "Bit Manipulation": {
    title: "Single Number",
    difficulty: "Easy",
    description:
      "Find the element that appears only once in an array.",
    input: `[4,1,2,1,2]`,
    output: `4`,
  },


  "Graph Algorithms": {
    title: "Shortest Path",
    difficulty: "Hard",
    description:
      "Find the shortest path between two vertices using Dijkstra algorithm.",
    input: `Graph with weighted edges`,
    output: `Minimum Distance`,
  },


  "Advanced DP": {
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    description:
      "Find the length of the longest increasing subsequence.",
    input: `[10,9,2,5,3,7,101,18]`,
    output: `4`,
  },


  "Advanced Graph": {
    title: "Word Ladder",
    difficulty: "Hard",
    description:
      "Find the shortest transformation sequence from begin word to end word.",
    input: `hit → cog`,
    output: `5`,
  }

};


export default problems;