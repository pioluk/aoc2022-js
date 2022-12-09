const input = Deno.readTextFileSync("input.txt").trim();
const lines = input.split("\n");

const N = 10;

type Coords = readonly [number, number];

const moves = lines.map((line) => {
  const [dir, n] = line.split(" ");
  return [dir, parseInt(n)] as const;
});

let knots: Coords[] = Array.from({ length: N }, () => [0, 0]);

const tailPositions = new Set<string>([JSON.stringify(knots[0])]);

function move([x, y]: Coords, dir: string, n: number): Coords {
  switch (dir) {
    case "R":
      return [x + n, y];

    case "U":
      return [x, y - n];

    case "D":
      return [x, y + n];

    case "L":
      return [x - n, y];
  }

  return [x, y];
}

function moveTowards([x1, y1]: Coords, [x2, y2]: Coords): Coords {
  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  return [
    xDiff === 0 ? x1 : x1 + (xDiff > 0 ? 1 : -1),
    yDiff === 0 ? y1 : y1 + (yDiff > 0 ? 1 : -1),
  ];
}

function isAdjacent([x1, y1]: Coords, [x2, y2]: Coords) {
  return Math.hypot(x1 - x2, y1 - y2) < 2;
}

for (const [dir, n] of moves) {
  const copy = [...knots];
  copy[0] = move(copy[0], dir, n);

  while (!copy.every((knot, i) => i === 0 || isAdjacent(knot, copy[i - 1]))) {
    for (let i = 1; i < copy.length && !isAdjacent(copy[i], copy[i - 1]); ++i) {
      copy[i] = moveTowards(copy[i], copy[i - 1]);
    }
    tailPositions.add(JSON.stringify(copy.at(-1)!));
  }

  knots = copy;
}

console.log(tailPositions.size);
