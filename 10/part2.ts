const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

const [, values] = lines.reduce<[number, number[]]>(([v, l], line) => {
  const [ins, x] = line.split(" ");
  if (ins === "noop") {
    return [v, [...l, v]];
  } else if (ins === "addx") {
    return [v + parseInt(x), [...l, v, v]];
  }

  return [v, l];
}, [1, []]);

const row_values = chunk(values, 40);

const result = row_values.map((xs) =>
  xs.map((x, i) => [x - 1, x, x + 1].includes(i) ? "█" : " ").join("")
).join("\n");

console.log(result);

function chunk<T>(input: T[], n: number): T[][] {
  const copy = [...input];
  const result = [];

  while (copy.length > 0) {
    result.push(copy.splice(0, n));
  }

  return result;
}
