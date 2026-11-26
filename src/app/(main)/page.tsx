import { EmptyState } from "@/components/ui/EmptyState";
import { Section } from "@/components/ui/Section";

const EMPTY = "아직 연결된 데이터가 없습니다.";

export default function HomePage() {
  return (
    <>
      <Section title="주요 공지">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="다가오는 일정">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="최근 내 기록">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="인기 게임">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="게임별 최고 기록">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
    </>
  );
}
