const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

const indices = [20, 60, 100, 140, 180, 220];

const [, values] = lines.reduce<[number, number[]]>(([v, l], line) => {
  const [ins, x] = line.split(" ");
  if (ins === "noop") {
    return [v, [...l, v]];
  } else if (ins === "addx") {
    return [v + parseInt(x), [...l, v, v]];
  }

  return [v, l];
}, [1, []]);

const result = indices.reduce((acc, i) => acc + i * values[i - 1], 0);

console.log(result);
