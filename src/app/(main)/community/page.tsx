import { EmptyState } from "@/components/ui/EmptyState";
import { PageTitle } from "@/components/ui/PageTitle";
import { Section } from "@/components/ui/Section";

const EMPTY = "아직 연결된 데이터가 없습니다.";

export default function CommunityPage() {
  return (
    <>
      <PageTitle>커뮤니티</PageTitle>
      <Section title="자유게시판">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="일정">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
    </>
  );
}
