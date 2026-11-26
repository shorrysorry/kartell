import { EmptyState } from "@/components/ui/EmptyState";
import { PageTitle } from "@/components/ui/PageTitle";

export default function NotificationsPage() {
  return (
    <>
      <PageTitle>알림</PageTitle>
      <div className="px-4">
        <EmptyState>알림 이벤트는 07 알림 정책 확정 후 연결합니다.</EmptyState>
      </div>
    </>
  );
}
