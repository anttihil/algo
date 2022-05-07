function debounce(fn, duration) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, duration);
  };
}
// ...args are variable length arguments that the "fn" needs
// notice that debounce does not return fn but a wrapper for fn!

setTimeout(() => {
  console.log("hey");
}, 1500);
let kekko = debounce(() => {
  console.log("hi");
}, 1000);

function throttle(func, duration) {
  let timer;
  return (...args) => {
    if (timer) return;
    // if there's no timer, we run the function once
    func(...args);
    // after that, we set a timed lock to prevent further func calls until the time is done
    timer = setTimeout(() => {
      timer = null;
    }, duration);
  };
}
