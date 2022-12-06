const input = Deno.readTextFileSync("./input.txt");

const lines = input.split("\n");

let maxCalories = 0;
let currentElfCalories = 0;

for (const line of lines) {
  if (line === "") {
    maxCalories = Math.max(maxCalories, currentElfCalories);
    currentElfCalories = 0;
    continue;
  }

  currentElfCalories += parseInt(line, 10);
}

maxCalories = Math.max(maxCalories, currentElfCalories);

console.log(maxCalories);
