import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AssistantPanel } from "@/components/assistant/assistant-panel";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <AssistantPanel />
    </div>
  );
}
