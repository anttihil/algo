// On the left side of "=", is a variable name to which values/objects in memory are assigned.
// On the right side is the object itself (that is, a reference to a memory address).

// This means that I can assign the object b (its reference) to variable name "a", and then
// assign object c to variable name "b" _without_ also changing variable name "a"'s value.
// variable name a's value is what was formerly b's value, and now b's and c's value are the same (c's original value.)

let a = { key: "a" };
let b = { key: "b" };
let c = { key: "c" };

a = b;
b = c;
console.log("a", a);
console.log("b", b);
console.log("c", c);

// Compare to this case

let d = { key: "d" };
let e = { key: "e" };
let f = { key: "f" };

e = d;
f = e;

console.log("d", d);
console.log("e", e);
console.log("f", f);

// All variable names refer to the same object.

let string = "a";
let number = "a9";
console.log(string.match(/\d/));
console.log(number.match(/\d/));

var keke;
function print(str = "no arg") {
  console.log(str);
}
print(keke);
