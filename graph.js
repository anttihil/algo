class Graph {
  constructor() {
    this.adj = new Map();
  }

  addVertex(v) {
    if (!this.adj.has(v)) this.adj.set(v, []);
  }

  addEdge(v1, v2) {
    this.adj.set(v1, [...this.adj.get(v1), v2]);
  }

  deleteVertex(v) {
    for (let [key, val] of this.adj) {
      this.adj.set(
        key,
        val.filter((n) => n !== v)
      );
    }
    this.adj.delete(v);
  }

  deleteEdge(v1, v2) {
    this.adj.set(
      v1,
      this.adj.get(v1).filter((n) => n !== v2)
    );
  }

  dfs(vertex) {
    let visited = new Map();

    const helper = (v) => {
      if (!this.adj.has(v)) {
        console.log("vertex undefined");
        return;
      }
      // dfs that prints value of each existing node
      console.log(v);
      visited.set(v, true);
      for (let n of this.adj.get(v)) {
        if (visited.get(n)) continue;
        helper(n);
      }
    };
    helper(vertex);
  }
}

let graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addVertex(1);
graph.addEdge(2, 1);
graph.addEdge(2, 3);
graph.addEdge(3, 2);
console.log("node 1", graph.adj.get(1));
graph.deleteEdge(1, 2);
console.log("node 1", graph.adj.get(1));
console.log("node 2", graph.adj.get(2));
//graph.deleteVertex(1);
console.log("node 1", graph.adj.get(1));
console.log("node 2", graph.adj.get(2));
graph.dfs(1);
