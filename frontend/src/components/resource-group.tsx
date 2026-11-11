import Link from "next/link";
import type { ResourceGroup as ResourceGroupData } from "@/data/resources";

function isExternal(href: string) {
  return href.startsWith("http");
}

export function ResourceGroup({ group }: { group: ResourceGroupData }) {
  return (
    <div className="hub-card">
      <h3 className="mb-3 text-base font-semibold">{group.title}</h3>
      <div className="space-y-1">
        {group.items.map((item) => {
          const external = isExternal(item.href);
          return (
            <Link
              key={item.title}
              href={item.href}
              className="resource-link"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span
                className="resource-icon"
                style={{ background: item.tint }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span>{item.title}</span>
              {external && (
                <span className="sr-only"> (opens in a new tab)</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
