import Link from "next/link";
import { Bell } from "lucide-react";

/** 상단 공통 영역: 서비스 이름 + 알림센터 진입 (08) */
export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-12 max-w-[480px] items-center justify-between px-4">
        <Link href="/" className="text-[17px] font-semibold tracking-tight">
          kartell
        </Link>
        <Link href="/notifications" aria-label="알림" className="-mr-2 flex size-11 items-center justify-center">
          <Bell size={22} strokeWidth={1.5} aria-hidden />
        </Link>
      </div>
    </header>
  );
}
