const input = Deno.readTextFileSync("input.txt");

const entries = input.split("\n\n");

interface Monkey {
  items: number[];
  operation: [string, string | number];
  divisibleBy: number;
  t: number;
  f: number;
}

const monkeys: Record<string, Monkey> = {};

let probablyNotLcm = 1;

let i = 0;
for (const entry of entries) {
  const lines = entry.split("\n");

  const items = lines[1]
    .match(/Starting items: (.+)/)![1]
    .split(", ")
    .map((x) => parseInt(x));
  const [, op, val] = lines[2].match(/Operation: new = old (.+) (.+)/)!;
  const value = /\d/.test(val) ? parseInt(val) : val;
  const divisibleBy = parseInt(lines[3].match(/Test: divisible by (\d+)/)![1]);
  const trueMonkey = parseInt(
    lines[4].match(/If true: throw to monkey (\d+)/)![1],
  );
  const falseMonkey = parseInt(
    lines[5].match(/If false: throw to monkey (\d+)/)![1],
  );

  probablyNotLcm *= divisibleBy;

  monkeys[i] = {
    items,
    operation: [op, value],
    divisibleBy,
    t: trueMonkey,
    f: falseMonkey,
  };

  ++i;
}

const inspectionCount = Object.fromEntries(
  Object.entries(monkeys).map(([k]) => [k, 0]),
);

for (let i = 0; i < 10000; ++i) {
  for (const [k, monkey] of Object.entries(monkeys)) {
    const { items, operation, divisibleBy, t, f } = monkey;
    while (items.length > 0) {
      ++inspectionCount[k];

      const item = items.shift()!;
      const worry = op(item, operation) % probablyNotLcm;
      if (worry % divisibleBy === 0) {
        monkeys[t].items.push(worry);
      } else {
        monkeys[f].items.push(worry);
      }
    }
  }
}

console.log(
  Object.values(inspectionCount)
    .toSorted((a, b) => (b > a ? 1 : -1))
    .slice(0, 2)
    .reduce((a, b) => a * b, 1),
);

function op(x: number, operation: Monkey["operation"]): number {
  const value = typeof operation[1] === "string" ? x : operation[1];
  if (operation[0] === "+") {
    return x + value;
  } else if (operation[0] === "-") {
    return x - value;
  } else if (operation[0] === "*") {
    return x * value;
  } else if (operation[0] === "/") {
    return x / value;
  }

  return x;
}
