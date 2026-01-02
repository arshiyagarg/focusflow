export const FlowchartRenderer = ({ data }: { data: any }) => {
  if (!data || !Array.isArray(data.steps)) {
    return (
      <div className="glass-card p-6">
        <h3 className="font-serif text-xl font-bold mb-4">Flowchart</h3>
        <p className="text-sm text-muted-foreground">
          No flowchart data available.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <h3 className="font-serif text-xl font-bold mb-4">Flowchart</h3>

      <ol className="space-y-3 list-decimal list-inside">
        {data.steps.map((step: string, i: number) => (
          <li
            key={i}
            className="p-3 border rounded-lg bg-muted"
          >
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};
