import { Search } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageTitle } from "@/components/ui/PageTitle";
import { Section } from "@/components/ui/Section";

export default function GamesPage() {
  return (
    <>
      <PageTitle>게임</PageTitle>
      <div className="px-4 pb-2">
        <label className="flex h-11 items-center gap-2 rounded-md border border-border px-3">
          <Search size={18} strokeWidth={1.5} className="text-muted" aria-hidden />
          <input type="search" placeholder="게임 이름으로 검색" className="w-full bg-transparent outline-none" disabled />
        </label>
      </div>
      <Section title="지원 게임">
        <EmptyState>등록된 지원 게임이 없습니다.</EmptyState>
      </Section>
    </>
  );
}
