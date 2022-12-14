const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

type Point = [number, number];

enum Material {
  Air = ".",
  Rock = "#",
  Sand = "o",
}

const N = 1_000;

const grid = Array.from(
  { length: N },
  () => Array.from({ length: N }, () => Material.Air),
);

for (const line of lines) {
  const points: Point[] = line.split(" -> ").map((x) =>
    x.split(",").map((n) => parseInt(n)) as Point
  );
  let start = points[0];
  for (let i = 1; i < points.length; ++i) {
    const current = points[i];
    if (start[0] === current[0]) {
      for (
        let y = Math.min(start[1], current[1]);
        y <= Math.max(start[1], current[1]);
        ++y
      ) {
        grid[y][start[0]] = Material.Rock;
      }
    } else if (start[1] === current[1]) {
      for (
        let x = Math.min(start[0], current[0]);
        x <= Math.max(start[0], current[0]);
        ++x
      ) {
        grid[start[1]][x] = Material.Rock;
      }
    }

    start = current;
  }
}

const abbyssIndexY = grid.findLastIndex((row) =>
  row.some((m) => m === Material.Rock)
) + 2;

grid[abbyssIndexY] = Array.from({ length: N }, () => Material.Rock);

let count = 0;
while (true) {
  ++count;

  let grainPosition: Point = [500, 0];

  while (true) {
      let [x, y] = grainPosition;
      while (true) {
        if (x < 0 || x >= N || y >= abbyssIndexY) {
          break;
        }
        if (grid[y + 1][x] === Material.Air) {
          ++y;
        } else if (grid[y + 1][x - 1] === Material.Air) {
          --x;
          ++y;
        } else if (grid[y + 1][x + 1] === Material.Air) {
          ++x;
          ++y
        } else {
          break;
        }
      }

      grid[y][x] = Material.Sand;
      grainPosition = [x, y];
      break;
  }

  if (grainPosition[0] === 500 && grainPosition[1] === 0) {
    break;
  }
}

console.log(count);
