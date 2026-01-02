
type OutputStyle = "summary" | "visual" | "flowchart" | "flashcards";

/* ---------------- CORE ADAPTER ---------------- */
export function contentToPlainText(
  data: any,
  outputStyle: OutputStyle
): string {

  switch (outputStyle) {
    case "summary":
      return summaryToPlainText(data);

    case "visual":
      return visualToPlainText(data);

    case "flashcards":
      return flashcardsToPlainText(data);

    case "flowchart":
      return flowchartToPlainText(data);

  }
}

/* ---------------- SUMMARY ---------------- */
function summaryToPlainText(data: any): string {

  return data.paragraphs
    .flatMap((p: any) => p.sentences.map((s: any) => s.text))
    .join("\n\n");
}

/* ---------------- VISUAL ---------------- */
function visualToPlainText(data: any): string {

    const nodeMap = new Map(
    data.nodes.map((n: any) => [n.id, n.label])
  );

  return data.edges
    .map((edge: any, index: number) => {
      const from = nodeMap.get(edge.from) ?? edge.from;
      const to = nodeMap.get(edge.to) ?? edge.to;
      const label = edge.label ?? "→";

      return `${index + 1}. ${from} → ${label} → ${to}`;
    })
    .join("\n");
}

/* ---------------- FLASHCARDS ---------------- */
function flashcardsToPlainText(data: any): string {
  if (!Array.isArray(data?.cards)) return "";

  return data.cards
    .map(
      (card: any, index: number) =>
        `Q${index + 1}: ${card.question}\nA: ${card.answer}`
    )
    .join("\n\n");
}

/* ---------------- FLOWCHART ---------------- */
function flowchartToPlainText(data: any): string {
  //if (!Array.isArray(data?.edges) || !Array.isArray(data?.nodes)) return "";

  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return data;
    }
  }

  if (!Array.isArray(data.steps)) return "";

  return data.steps
    .map((step: string, index: number) => `${index + 1}. ${step}`)
    .join("\n");
}
