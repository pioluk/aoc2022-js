const input = Deno.readTextFileSync("input.txt");

const lines = input.split("\n");

type Point = { x: number; y: number };

const Point = (x: number, y: number): Point => ({ x, y });

const getManhatanDistance = (p1: Point, p2: Point): number =>
  Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const points = lines.map((line) => {
  const [, sx1, sy1, sx2, sy2] = line.match(
    /x=([-]{0,1}\d+), y=([-]{0,1}\d+): closest beacon is at x=([-]{0,1}\d+), y=([-]{0,1}\d+)/,
  )!;
  const x1 = parseInt(sx1);
  const y1 = parseInt(sy1);
  const x2 = parseInt(sx2);
  const y2 = parseInt(sy2);

  const sensor = Point(x1, y1);
  const beacon = Point(x2, y2);

  return [sensor, beacon] as const;
});

const Y = 2_000_000;

const xs: number[] = [];

for (const [sensor, beacon] of points) {
  const yDistance = getManhatanDistance(sensor, Point(sensor.x, Y));
  const beaconDistance = getManhatanDistance(sensor, beacon);
  if (yDistance > beaconDistance) {
    continue;
  }

  const notSensorCountAtY = beaconDistance - yDistance;
  for (let i = 0; i <= notSensorCountAtY; ++i) {
    xs.push(sensor.x - i, sensor.x + i);
  }
}

const uniqueXs = new Set(xs);

points
  .flatMap((x) => x)
  .forEach((point) => {
    if (point.y === Y) {
      uniqueXs.delete(point.x);
    }
  });

console.log(uniqueXs.size);
