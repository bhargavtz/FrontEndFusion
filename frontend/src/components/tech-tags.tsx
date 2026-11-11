export function TechTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span key={tag} className="tech-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}
