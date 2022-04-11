class UnionFind {
  constructor(n) {
    this.id = [];
    this.size = n;
    this.sz = [];
    for (let i = 0; i < n; i++) {
      // Set groups of size 1 for each element (every element points to itself)
      this.id[i] = i;
      this.sz[i] = 1;
    }
  }
  find(p) {
    // we find what group p belongs to. The group is identified by its root.
    // initialize root variable to p
    let root = p;
    // assign the pointer's id value to root variable until the pointer key and its value are the same (self-loop).
    while (root != this.id[root]) root = this.id[root];

    //
    while (p != root) {
      let next = this.id[p];
      this.id[p] = root;
      p = next;
    }
  }
  unite(p, q) {
    // check if the elements are already connected
    //
  }
}
