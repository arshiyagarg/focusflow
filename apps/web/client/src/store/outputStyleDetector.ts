export type OutputStyle =
  | "summary"
  | "visual"
  | "flowchart"
  | "flashcards";

export function detectOutputStyle(data: any): OutputStyle | null {
  if (!data) return null;

  // Blob string → parse
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return null;
    }
  }

  // SUMMARY
  if (Array.isArray(data.paragraphs)) {
    return "summary";
  }

  // FLASHCARDS
  if (Array.isArray(data.cards)) {
    return "flashcards";
  }

  if (Array.isArray(data.steps)) {
    return "flowchart";
  }

  // GRAPH (visual / flowchart)
  if (Array.isArray(data.nodes) && Array.isArray(data.edges)) {
    return "visual"; // or "flowchart"
  }

  return null;
}
