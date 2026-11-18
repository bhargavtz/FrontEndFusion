import { buildSearchIndex } from "@/lib/learn";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
