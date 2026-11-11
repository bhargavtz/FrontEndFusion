export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="section-title">{title}</h2>
      {description && (
        <p
          className="mt-3 max-w-2xl text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
