class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  insert(value) {
    let heap = this.values;
    heap.push(value);
    let added = heap.length - 1;
    function findParent(x) {
      return Math.floor((x - 1) / 2);
    }
    const bubbleUp = (child, parent) => {
      if (heap[child] > heap[parent]) {
        [heap[child], heap[parent]] = [heap[parent], heap[child]];
        bubbleUp(parent, findParent(parent));
      }
    };
    bubbleUp(added, findParent(added));
  }
  extractMax() {
    let heap = this.values;
    let last = heap.length - 1;
    let max = heap[0];
    [heap[0], heap[last]] = [heap[last], heap[0]];
    heap.pop();
    const bubbleDown = (p, l, r) => {
      if (heap[l] > heap[p]) {
        [heap[p], heap[l]] = [heap[l], heap[p]];
        bubbleDown(l, 2 * l + 1, 2 * l + 2);
      } else if (heap[r] > heap[p]) {
        [heap[p], heap[r]] = [heap[r], heap[p]];
        bubbleDown(r, 2 * r + 1, 2 * r + 2);
      }
    };
    bubbleDown(0, 1, 2);
    return max;
  }
}

let heap = new MaxBinaryHeap();
heap.insert(5);
heap.insert(2);
heap.insert(10);
heap.insert(8);
heap.insert(7);
heap.insert(15);
heap.insert(16);
console.log(heap.extractMax());
console.log(heap);
