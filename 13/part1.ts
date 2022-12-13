const input = Deno.readTextFileSync("input.txt");

const pairs = input
  .split("\n\n")
  .map((pair) => pair.split("\n").map((line) => JSON.parse(line)));

console.log(
  pairs
    .map(([a, b]) => isRightOrder(a, b))
    .reduce((acc, value, i) => (value ? acc + i + 1 : acc), 0),
);

function isRightOrder(a: unknown, b: unknown): boolean | undefined {
  if (isNumber(a) && isNumber(b)) {
    return a < b;
  }

  if (Array.isArray(a) && isNumber(b)) {
    return isRightOrder(a, [b]);
  }
  if (isNumber(a) && Array.isArray(b)) {
    return isRightOrder([a], b);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < Math.max(a.length, b.length); ++i) {
      const ax = a[i];
      const bx = b[i];

      if (typeof ax === "undefined") {
        return true;
      }

      if (typeof bx === "undefined") {
        return false;
      }

      if (isNumber(ax) && isNumber(bx) && ax === bx) {
        continue;
      }

      const res = isRightOrder(ax, bx);
      if (typeof res === "boolean") {
        return res;
      }
    }
  }
}

function isNumber(x: unknown): x is number {
  return typeof x === "number";
}
