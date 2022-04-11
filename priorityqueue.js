class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    let heap = this.values;
    let node = new Node(val, priority);
    heap.push(node);
    console.log(heap[0].priority);
    let added = heap.length - 1;
    function findParent(x) {
      return Math.floor((x - 1) / 2);
    }
    const bubbleUp = (child, parent) => {
      if (heap[child].priority > heap[parent]?.priority) {
        [heap[child], heap[parent]] = [heap[parent], heap[child]];
        bubbleUp(parent, findParent(parent));
      }
    };
    bubbleUp(added, findParent(added));
  }
  dequeue() {
    let heap = this.values;
    let last = heap.length - 1;
    let max = heap[0];
    [heap[0], heap[last]] = [heap[last], heap[0]];
    heap.pop();
    const bubbleDown = (p, l, r) => {
      if (heap[l]?.priority > heap[p]?.priority) {
        [heap[p], heap[l]] = [heap[l], heap[p]];
        bubbleDown(l, 2 * l + 1, 2 * l + 2);
      } else if (heap[r]?.priority > heap[p]?.priority) {
        [heap[p], heap[r]] = [heap[r], heap[p]];
        bubbleDown(r, 2 * r + 1, 2 * r + 2);
      }
    };
    bubbleDown(0, 1, 2);
    return max;
  }
}

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

let pq = new PriorityQueue();
pq.enqueue("first", 56);
pq.enqueue("second", 15);
pq.enqueue("third", 17);
pq.enqueue("fourth", 4);
pq.enqueue("keke", 1);
pq.enqueue("fifth", 67);
pq.enqueue("sixth", 57);
console.log(pq.dequeue());
