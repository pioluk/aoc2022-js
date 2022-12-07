const input = Deno.readTextFileSync("./input.txt");

const lines = input.split("\n");

let top3 = [0, 0, 0];
let currentElfCalories = 0;

function add(calories: number) {
  top3 = [...top3, calories].sort((a, b) => b - a).slice(0, 3);
}

for (const line of lines) {
  if (line === "") {
    add(currentElfCalories);
    currentElfCalories = 0;
    continue;
  }

  currentElfCalories += parseInt(line, 10);
}

add(currentElfCalories);

console.log(top3.reduce((a, b) => a + b, 0));
