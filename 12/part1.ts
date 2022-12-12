const input = Deno.readTextFileSync("input.txt");
const grid = input.split("\n").map((line) => line.split(""));
const gridStr = input.replaceAll("\n", "").split("");

const width = grid[0].length;
const height = grid.length;

type Coords = [number, number];

const startIndex = gridStr.findIndex((x) => x === "S");
const startCoords = getCoords(startIndex);
const endIndex = gridStr.findIndex((x) => x === "E");
const endCoords = getCoords(endIndex);

const distances = new Map<string, number>();
setDistance(startCoords, 0);

let result = -1;

const queue: Coords[] = [startCoords];

while (queue.length > 0) {
  const coords = queue.shift()!;
  if (coords[0] === endCoords[0] && coords[1] === endCoords[1]) {
    result = getDistance(endCoords);
    break;
  }

  const neighbors = getNeighbors(coords);
  for (const neighbor of neighbors) {
    if (canMove(coords, neighbor)) {
      const nextDistance = getDistance(coords) + 1;
      const neighborDistance = getDistance(neighbor);
      if (nextDistance < neighborDistance) {
        queue.push(neighbor);
        setDistance(neighbor, nextDistance);
      }
    }
  }
}

console.log(result);

function getDistance(coord: Coords): number {
  return distances.get(JSON.stringify(coord)) ?? Infinity;
}

function setDistance(coord: Coords, value: number) {
  return distances.set(JSON.stringify(coord), value);
}

function canMove(from: Coords, to: Coords) {
  const fromElevation = getElevation(from);
  const toElevation = getElevation(to);

  if (toElevation === "E") {
    return fromElevation === "y" || fromElevation === "z";
  }

  return (
    fromElevation === "S" ||
    toElevation.charCodeAt(0) - fromElevation.charCodeAt(0) <= 1
  );
}

function getNeighbors([x, y]: Coords): Coords[] {
  return [
    [x - 1, y],
    [x, y - 1],
    [x + 1, y],
    [x, y + 1],
  ].filter(
    ([x1, y1]) => x1 >= 0 && x1 < width && y1 >= 0 && y1 < height,
  ) as Coords[];
}

function getElevation(coords: Coords): string {
  return gridStr[getIndex(coords)];
}

function getIndex([x, y]: Coords): number {
  return y * width + x;
}

function getCoords(index: number): [x: number, y: number] {
  const y = (index / width) | 0;
  const x = index - y * width;
  return [x, y];
}
