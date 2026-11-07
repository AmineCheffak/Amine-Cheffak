export interface TerminalLine {
  id: number;
  type: "command" | "output" | "error" | "success";
  content: string;
  animated?: boolean;
}

export type NewLine = Omit<TerminalLine, "id">;

export interface CommandResult {
  lines: NewLine[];
  action?: "clear" | "exit";
}