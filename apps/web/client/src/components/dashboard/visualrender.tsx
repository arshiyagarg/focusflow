export const VisualRenderer = ({ data }: { data: any }) => {
  if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) {
    return (
      <div className="glass-card p-6">
        <h3 className="font-serif text-xl font-bold">Visual Output</h3>
        <p className="text-sm text-muted-foreground mt-4">
          No visual data available.
        </p>
      </div>
    );
  }

  // Same idea as SummaryRenderer: transform → render
  const nodeMap = new Map(
    data.nodes.map((n: any) => [n.id, n.label])
  );

  const visualText = data.edges
    .map((edge: any, index: number) => {
      const from = nodeMap.get(edge.from) ?? edge.from;
      const to = nodeMap.get(edge.to) ?? edge.to;
      const label = edge.label ?? "→";

      return `${index + 1}. ${from} → ${label} → ${to}`;
    })
    .join("\n");

  return (
    <div className="glass-card p-6">
      <h3 className="font-serif text-xl font-bold">Visual Output</h3>

      <pre className="text-sm mt-4 bg-muted/30 p-4 rounded whitespace-pre-wrap leading-relaxed">
        {visualText}
      </pre>
    </div>
  );
};
