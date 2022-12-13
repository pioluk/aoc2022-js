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

let visibleCount = width * 2 + height * 2 - 4;

for (let x = 1; x < width - 1; ++x) {
  for (let y = 1; y < height - 1; ++y) {
    const currentHeight = getHeight(x, y);

    const leftHeights = range(0, x).map((mx) => getHeight(mx, y));
    const rightHeights = range(x + 1, width).map((mx) => getHeight(mx, y));
    const topHeights = range(0, y).map((my) => getHeight(x, my));
    const bottomHeights = range(y + 1, height).map((my) => getHeight(x, my));

    const checkVisibility = (height: number) => height < currentHeight;

    const isVisibleFromTop = topHeights.every(checkVisibility);
    const isVisibleFromRight = rightHeights.every(checkVisibility);
    const isVisibleFromBottom = bottomHeights.every(checkVisibility);
    const isVisibleFromLeft = leftHeights.every(checkVisibility);

    const isVisible = isVisibleFromTop || isVisibleFromRight ||
      isVisibleFromBottom || isVisibleFromLeft;

    if (isVisible) {
      ++visibleCount;
    }
  }
}

console.log(visibleCount);
