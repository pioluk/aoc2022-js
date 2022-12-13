const input = Deno.readTextFileSync("./input.txt");
const lines = input.split("\n");

const width = lines[0].length;
const height = lines.length;

function getHeight(x: number, y: number): number {
  return parseInt(lines[y][x]);
}

function range(start: number, end: number): number[] {
  if (end <= start) {
    return [];
  }

  return Array.from({ length: end - start }, (_, i) => i + start);
}

function countVisibleTrees(ownHeight: number, heights: number[]): number {
  const index = heights.findIndex((x) => x >= ownHeight);
  return (index > -1 ? index + 1 : heights.length);
}

let score = 0;

for (let x = 1; x < width - 1; ++x) {
  for (let y = 1; y < height - 1; ++y) {
    const currentHeight = getHeight(x, y);

    const allLeftHeights = range(0, x).map((mx) => getHeight(mx, y))
      .toReversed();
    const allRightHeights = range(x + 1, width).map((mx) => getHeight(mx, y));
    const allTopHeights = range(0, y).map((my) => getHeight(x, my))
      .toReversed();
    const allBottomHeights = range(y + 1, height).map((my) => getHeight(x, my));

    const topScore = countVisibleTrees(currentHeight, allTopHeights);
    const rightScore = countVisibleTrees(currentHeight, allRightHeights);
    const bottomScore = countVisibleTrees(currentHeight, allBottomHeights);
    const leftScore = countVisibleTrees(currentHeight, allLeftHeights);

    const currentScore = topScore * rightScore * bottomScore * leftScore;

    score = Math.max(score, currentScore);
  }
}

console.log(score);
