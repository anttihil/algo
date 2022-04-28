class UnionFind {
  constructor(n) {
    this.id = [];
    this.size = n;
    this.sizes = [];
    this.numberOfComponents = n;
    for (let i = 0; i < n; i++) {
      // Set groups of size 1 for each element (every element points to itself)
      this.id[i] = i;
      this.sizes[i] = 1;
    }
  }
  find(p) {
    // we find what group p belongs to. The group is identified by its root.
    // initialize root variable to p
    let root = p;
    // assign the pointer's id value to root variable until the pointer key and its value are the same (self-loop).
    while (root != this.id[root]) root = this.id[root];

    // compress the subordinate nodes by starting from p and making them point to root one by one
    // saving the original value of p (the value it points to)
    // changing p to point to root value
    // moving onto the next value which we saved until we arrive at root
    while (p != root) {
      let next = this.id[p];
      this.id[p] = root;
      p = next;
    }
    return root;
  }
  unite(p, q) {
    // check if the elements are already connected
    if (this.connected(p, q)) return;

    let root1 = this.find(p);
    let root2 = this.find(q);

    if (this.sizes[root1] < this.sizes[root2]) {
      this.id[root1] = root2;
      this.sizes[root2] += this.sizes[root1];
      this.sizes[root1] = 0;
    } else {
      this.id[root2] = root1;
      this.sizes[root1] += this.sizes[root2];
      this.sizes[root2] = 0;
    }
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }
}

let uf = new UnionFind(8);

uf.unite(0, 7);
uf.unite(1, 2);
uf.unite(4, 5);
uf.unite(4, 6);
uf.unite(7, 1);
console.log(uf.find(0));
console.log(uf.find(7));
console.log(uf.find(4));
console.log(uf.find(1));
