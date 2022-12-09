const input = Deno.readTextFileSync("input.txt").trim();
const lines = input.split("\n");

type Coords = readonly [number, number];

const moves = lines.map((line) => {
  const [dir, n] = line.split(" ");
  return [dir, parseInt(n)] as const;
});

let head: Coords = [0, 0];
let tail: Coords = [0, 0];

const tailPositions = new Set<string>([JSON.stringify(tail)]);

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
    xDiff === 0 ? x1 : (x1 + (xDiff > 0 ? 1 : -1)),
    yDiff === 0 ? y1 : (y1 + (yDiff > 0 ? 1 : -1)),
  ];
}

function isAdjacent([x1, y1]: Coords, [x2, y2]: Coords) {
  return Math.hypot(x1 - x2, y1 - y2) < 2;
}

for (const [dir, n] of moves) {
  head = move(head, dir, n);

  while (!isAdjacent(head, tail)) {
    tail = moveTowards(tail, head);
    tailPositions.add(JSON.stringify(tail));
  }
}

console.log(tailPositions.size);
