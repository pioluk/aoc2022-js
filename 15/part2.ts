const input = Deno.readTextFileSync("input.txt");

const lines = input.split("\n");

type Point = { x: number; y: number };

const Point = (x: number, y: number): Point => ({ x, y });

const arePointsEqual = ({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point) =>
  x1 === x2 && y1 === y2;

const MIN_COORDINATE = 0;
const MAX_COORDINATE = 4e6;

const isPointValid = ({ x, y }: Point) =>
  x >= MIN_COORDINATE && y >= MIN_COORDINATE && x <= MAX_COORDINATE &&
  y <= MAX_COORDINATE;

const getManhatanDistance = (p1: Point, p2: Point): number =>
  Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const getTuningFrequency = ({ x, y }: Point) => x * 4000000 + y;

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

for (const [sensor, beacon] of points) {
  const beaconDistance = getManhatanDistance(sensor, beacon);

  const l = beaconDistance + 1;
  for (let i = 0; i < l; ++i) {
    const candidates = [
      Point(sensor.x - (l - i), sensor.y - i),
      Point(sensor.x + (l - i), sensor.y - i),
      Point(sensor.x - (l - i), sensor.y + i),
      Point(sensor.x + (l - i), sensor.y + i),
    ];

    for (const c of candidates) {
      if (
        isPointValid(c) &&
        points.every(([s, b]) => {
          return getManhatanDistance(s, c) > getManhatanDistance(s, b) &&
            !arePointsEqual(c, s) && !arePointsEqual(c, b);
        })
      ) {
        console.log(c, getTuningFrequency(c));
        Deno.exit();
      }
    }
  }
}
