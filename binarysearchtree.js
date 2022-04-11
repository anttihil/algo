class BST {
  constructor() {
    this.root = null;
  }
  insert(value) {
    let node = new Node(value);
    if (this.root === null) {
      this.root = node;
      return this;
    }

    function recurse(node, current) {
      if (node.value < current.value) {
        if (current.left === null) {
          current.left = node;
          return this;
        }
        return recurse.call(this, node, current.left);
      } else if (node.value > current.value) {
        if (current.right === null) {
          current.right = node;
          return this;
        }
        return recurse.call(this, node, current.right);
      } else return false;
    }
    return recurse.call(this, node, this.root);
  }
  find(value) {
    if (this.root === null) {
      return false;
    }
    function search(value, current = this.root) {
      if (current === null) {
        return false;
      }
      if (value === current.value) return current;
      if (value < current.value) return search(value, current.left);
      if (value > current.value) return search(value, current.right);
    }
    return search.call(this, value);
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let tree = new BST();

console.log("root level", tree.insert(20));
console.log("1st level", tree.insert(15));
console.log("2nd level", tree.insert(10));
tree.insert(18);
tree.insert(26);
console.log("tree.left", tree.root.left);
console.log("search", tree.find(10));
