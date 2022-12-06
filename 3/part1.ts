const input = Deno.readTextFileSync("./input.txt");
const lines = input.split("\n");

const result = lines
  .filter((line) => line !== "")
  .flatMap((line) => {
    const length = line.length;
    const pivot = (length / 2) | 0;
    const compartment1 = line.slice(0, pivot);
    const compartment2 = line.slice(pivot);

    const items1 = new Set(compartment1.split(""));
    const items2 = new Set(compartment2.split(""));

    return intersectSet(items1, items2).map((c) => getPriority(c));
  })
  .reduce((a, b) => a + b, 0);

console.log(result);

function intersectSet(set1: Set<string>, set2: Set<string>): string[] {
  const itemCount1 = [...set1].reduce<Record<string, number>>(
    (acc, key) => {
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const itemCount = [...set2].reduce<Record<string, number>>(
    (acc, key) => {
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    },
    itemCount1,
  );

  return Object.keys(
    Object.fromEntries(
      Object.entries(itemCount).filter(([, value]) => value > 1),
    ),
  );
}

function getPriority(char: string): number {
  const charCode = char.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) return charCode - 38;
  if (charCode >= 97 && charCode <= 122) return charCode - 96;

  return Infinity;
}
