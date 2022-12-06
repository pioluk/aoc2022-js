const input = Deno.readTextFileSync("./input.txt");
const lines = input.split("\n");

const stacksDescription = takeWhile(lines, (x) => x !== "");

const stackNumbers = stacksDescription.at(-1)!.split(/\s/).filter((x) =>
  x !== ""
).map((x) => parseInt(x, 10));

type Stacks = Record<string, string[]>;

const stacks = stackNumbers.reduce<Stacks>(
  (acc, stackNumber) => {
    const crates: string[] = [];

    for (const line of stacksDescription.slice(0, -1)) {
      const startIndex = Math.max(
        0,
        stacksDescription.at(-1)!.indexOf(`${stackNumber}`) - 1,
      );
      const endIndex = startIndex + 3;
      const str = line.slice(startIndex, endIndex);
      const [, crate] = str.match(/\[([A-Z])]/) ?? [];
      if (crate) {
        crates.push(crate);
      }
    }

    acc[stackNumber] = crates;

    return acc;
  },
  {},
);

const commands = lines.slice(stacksDescription.length + 1);

const finalStacks = commands.map(parseCommand).reduce<Stacks>(
  (acc, command) => {
    const [count, from, to] = command;

    const fromCopy = [...acc[from]];
    const movedCrates = fromCopy.splice(0, count);

    const res = {
      ...acc,
      [from]: fromCopy,
      [to]: [...movedCrates, ...acc[to]],
    };

    // Deno.stdin.readSync(new Uint8Array(1));
    // printStacks(res);

    return res;
  },
  stacks,
);

console.log(Object.values(finalStacks).map((stack) => stack[0]).join(""));

function parseCommand(cmd: string): [number, number, number] {
  return cmd.match(/move (\d+) from (\d+) to (\d+)/)!.slice(1).map((x) =>
    parseInt(x, 10)
  ) as [number, number, number];
}

function takeWhile<T>(xs: T[], pred: (x: T) => boolean): T[] {
  const result = [];
  for (const x of xs) {
    if (pred(x) === false) {
      break;
    }
    result.push(x);
  }

  return result;
}

function printStacks(stacks: Stacks) {
  console.log(
    Object.fromEntries(
      Object.entries(stacks).map(([k, v]) => [k, v.join(",")]),
    ),
  );
}
