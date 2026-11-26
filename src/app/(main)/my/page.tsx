import { EmptyState } from "@/components/ui/EmptyState";
import { PageTitle } from "@/components/ui/PageTitle";
import { Section } from "@/components/ui/Section";

const EMPTY = "아직 연결된 데이터가 없습니다.";

export default function MyPage() {
  return (
    <>
      <PageTitle>MY</PageTitle>
      <Section title="프로필">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="게임별 개인 통계">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="업적">
        <EmptyState>{EMPTY}</EmptyState>
      </Section>
      <Section title="설정">
        <EmptyState>알림 · 설치 · 계정 설정은 정책 확정 후 추가합니다.</EmptyState>
      </Section>
    </>
  );
}
