import RevxsApp from "@/components/revenue/revxs-app";
import type { Section } from "@/lib/types";

const sections: Section[] = [
  "inbound",
  "outbound",
  "opportunities",
  "accounts",
  "contacts",
  "revenue-plays",
  "artefacts",
  "knowledge",
  "brand",
  "rules",
  "settings"
];

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export default function SectionPage({ params }: { params: { section: string } }) {
  const section = sections.includes(params.section as Section) ? (params.section as Section) : "queue";
  return <RevxsApp initialSection={section} />;
}
