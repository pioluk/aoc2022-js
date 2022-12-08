const input = Deno.readTextFileSync("./input.txt");

const N = 4;

for (let i = 0; i < input.length - N; ++i) {
  if (new Set(input.slice(i, i + N).split("")).size === N) {
    console.log(i + N);
    break;
  }
}
