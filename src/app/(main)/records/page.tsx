import { EmptyState } from "@/components/ui/EmptyState";
import { PageTitle } from "@/components/ui/PageTitle";
import { Section } from "@/components/ui/Section";

const EMPTY = "아직 연결된 데이터가 없습니다.";

export default function RecordsPage() {
  return (
    <>
      <PageTitle>기록</PageTitle>
      <Section title="참가 기록">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="내가 만든 기록">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="미확정 기록">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
    </>
  );
}
