const input = Deno.readTextFileSync("./input.txt");
const lines = input.split("\n");

enum RockPaperScissors {
  Rock = "R",
  Paper = "P",
  Scissors = "S",
}

enum Result {
  Win = "W",
  Draw = "D",
  Lose = "L",
}

function getResult(p1: RockPaperScissors, p2: RockPaperScissors): Result {
  if (p1 === p2) {
    return Result.Draw;
  }

  switch (p1) {
    case RockPaperScissors.Rock:
      if (p2 === RockPaperScissors.Paper) return Result.Lose;
      if (p2 === RockPaperScissors.Scissors) return Result.Win;
      break;

    case RockPaperScissors.Paper:
      if (p2 === RockPaperScissors.Rock) return Result.Win;
      if (p2 === RockPaperScissors.Scissors) return Result.Lose;
      break;

    case RockPaperScissors.Scissors:
      if (p2 === RockPaperScissors.Rock) return Result.Lose;
      if (p2 === RockPaperScissors.Paper) return Result.Win;
      break;
  }

  throw new Error("Unreachable");
}

function notation1ToRPS(input: string): RockPaperScissors {
  if (input === "A") return RockPaperScissors.Rock;
  if (input === "B") return RockPaperScissors.Paper;
  if (input === "C") return RockPaperScissors.Scissors;

  throw new Error("Unreachable");
}

function notation2ToRPS(input: string): RockPaperScissors {
  if (input === "X") return RockPaperScissors.Rock;
  if (input === "Y") return RockPaperScissors.Paper;
  if (input === "Z") return RockPaperScissors.Scissors;

  throw new Error("Unreachable");
}

function resultToPoint(result: Result) {
  switch (result) {
    case Result.Win:
      return 6;
    case Result.Draw:
      return 3;
    default:
      return 0;
  }
}

function notation2ToPoint(input: string): number {
  if (input === "X") return 1;
  if (input === "Y") return 2;
  if (input === "Z") return 3;

  throw new Error("Unreachable");
}

const finalPoints = lines.map((line) => {
  if (line === "") {
    return 0;
  }

  const [notation1, notation2] = line.split(" ");

  const rps1 = notation1ToRPS(notation1);
  const rps2 = notation2ToRPS(notation2);

  const result = getResult(rps2, rps1);
  const resultPoints = resultToPoint(result);
  const figurePoint = notation2ToPoint(notation2);

  return figurePoint + resultPoints;
}).reduce((a, b) => a + b, 0);

console.log(finalPoints);
