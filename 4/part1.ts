const input = Deno.readTextFileSync("./input.txt");
const lines = input.split("\n");

let count = 0;

for (const line of lines) {
  const [section1, section2] = line.split(",");

  const [low1, high1] = section1.split("-").map((x) => parseInt(x, 10));
  const [low2, high2] = section2.split("-").map((x) => parseInt(x, 10));

  if ((low1 <= low2 && high1 >= high2) || (low2 <= low1 && high2 >= high1)) {
    ++count;
  }
}

console.log(count);
