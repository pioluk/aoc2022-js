const input = Deno.readTextFileSync("input.txt");

const additionalPackets = [[[2]], [[6]]];

const packets = input
  .split("\n").filter((x) => x !== "").map((line) => JSON.parse(line));

const sortedPackets = [...additionalPackets, ...packets].sort((a, b) =>
  isRightOrder(a, b) ? -1 : 1
).map((x) => JSON.stringify(x));

const result =
  (1 + sortedPackets.indexOf(JSON.stringify(additionalPackets[0]))) *
  (1 + sortedPackets.indexOf(JSON.stringify(additionalPackets[1])));

console.log(
  result,
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
