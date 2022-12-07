const input = Deno.readTextFileSync("input.txt");
const lines = input.split("\n");

const directoryStack: string[] = [];
const sizeByFilePath = new Map<string, number>();

lines.forEach((line) => {
  if (isCommand(line)) {
    const [cmd, args] = parseCommand(line);
    if (cmd === "cd" && args[0] === "..") {
      directoryStack.pop();
    } else if (cmd === "cd" && args[0] === "/") {
      directoryStack.splice(0, directoryStack.length);
    } else if (cmd === "cd") {
      directoryStack.push(args[0]);
    }
  } else {
    // output
    if (line.startsWith("dir")) {
      return;
    }

    const [size, fileName] = line.split(" ");

    const file = "/" + [...directoryStack, fileName].join("/");
    sizeByFilePath.set(file, parseInt(size, 10));
  }
});

const sorted = new Map(
  Array.from(sizeByFilePath.entries()).toSorted(
    ([k1], [k2]) => getPathDepth(k2) - getPathDepth(k1),
  ),
);

const sizeByDirectory = new Map<string, number>();

Array.from(sorted.entries()).forEach(([path, size]) => {
  const directoryPath = path.split("/").slice(0, -1);

  for (let i = 1; i < directoryPath.length + 1; ++i) {
    const currentPath = directoryPath.slice(0, i).join("/") || "/";

    const currentSize = sizeByDirectory.get(currentPath) ?? 0;
    sizeByDirectory.set(currentPath, currentSize + size);
  }
});

console.log(
  Array.from(sizeByDirectory.values())
    .filter((x) => x <= 100_000)
    .reduce((a, b) => a + b, 0),
);

function getPathDepth(path: string): number {
  return path.split("").filter((x) => x === "/").length;
}

function isCommand(str: string): boolean {
  return str.startsWith("$ ");
}

function parseCommand(cmd: string): [string, string[]] {
  const [command, ...args] = cmd.replace(/^\$\ /, "").split(" ");
  return [command, args];
}
