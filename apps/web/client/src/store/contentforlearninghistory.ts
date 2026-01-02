export function contentToPlainText(data: any): string {
  if (!data) return "";

  // Blob JSON safety
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      return stripHtmlTags(data);
    }
  }

  // SUMMARY
  if (Array.isArray(data.paragraphs)) {
    const text= data.paragraphs
      .flatMap((p: any) => p.sentences.map((s: any) => s.text))
      .join("\n\n");
    return stripHtmlTags(text);
  }

  // FLOWCHART (steps)
  if (Array.isArray(data.steps)) {
    return data.steps
      .map((step: string, i: number) => `${i + 1}. ${step}`)
      .join("\n");
  }

  // FLASHCARDS
  if (Array.isArray(data.cards)) {
    return data.cards
      .map(
        (c: any, i: number) =>
          `Q${i + 1}: ${c.question}\nA: ${c.answer}`
      )
      .join("\n\n");
  }

  // VISUAL (graph)
  if (Array.isArray(data.nodes) && Array.isArray(data.edges)) {
    const nodeMap = new Map(
      data.nodes.map((n: any) => [n.id, n.label])
    );

    return data.edges
      .map((e: any, i: number) => {
        const from = nodeMap.get(e.from) ?? e.from;
        const to = nodeMap.get(e.to) ?? e.to;
        return `${i + 1}. ${from} → ${e.label} → ${to}`;
      })
      .join("\n");
  }

  return JSON.stringify(data, null, 2);
}


function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}