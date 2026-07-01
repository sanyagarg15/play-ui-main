export function joinLines(...lines: Array<string | false | null | undefined>): string {
  return lines.filter((line): line is string => typeof line === "string").join("\n");
}
