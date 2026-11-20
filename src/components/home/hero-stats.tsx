"use client";

import CountUp from "@/components/react-bits/CountUp";

export type HeroStat = { label: string; value: number };

/** Hero numbers count up once when they scroll into view. */
export function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <dl className="stats">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt>{stat.label}</dt>
          <dd>
            <CountUp to={stat.value} duration={1.4} trigger="view" separator="," />
          </dd>
        </div>
      ))}
    </dl>
  );
}
