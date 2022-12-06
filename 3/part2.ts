const input = Deno.readTextFileSync("./input.txt");
const lines = input.split("\n").filter((line) => line !== "");

const groupped: Array<[string, string, string]> = [];
while (lines.length > 0) {
  groupped.push(lines.splice(0, 3) as [string, string, string]);
}

const result = groupped
  .flatMap(([r1, r2, r3]) => {
    const s1 = new Set(r1.split(''));
    const s2 = new Set(r2.split(''));
    const s3 = new Set(r3.split(''));
    return intersectSet(s1, s2, s3).map((c) => getPriority(c));
  })
  .reduce((a, b) => a + b, 0);

console.log(result);

function intersectSet(...sets: Set<string>[]): string[] {
  const itemCount = sets.reduce<Record<string, number>>((acc, set) => {
    return [...set].reduce<Record<string, number>>((acc2, key) => {
      acc2[key] = (acc2[key] ?? 0) + 1;
      return acc;
    }, acc);
  }, {});

  return Object.keys(
    Object.fromEntries(
      Object.entries(itemCount).filter(([, value]) => value === sets.length),
    ),
  );
}

function getPriority(char: string): number {
  const charCode = char.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) return charCode - 38;
  if (charCode >= 97 && charCode <= 122) return charCode - 96;

  return Infinity;
}
