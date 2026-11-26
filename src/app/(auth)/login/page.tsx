import { Button } from "@/components/ui/Button";

/** 카카오 단일 로그인 (02). 실제 OAuth 연동 전이라 버튼은 비활성. */
export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col justify-between px-4 pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      <div>
        <h1 className="text-[24px] font-semibold">kartell</h1>
        <p className="mt-2 text-muted">보드게임 모임 점수 계산과 플레이 기록</p>
      </div>
      <div>
        <Button className="w-full" disabled>
          카카오로 시작하기
        </Button>
        <p className="mt-3 text-center text-[13px] text-muted">
          가입 신청 후 관리자 승인이 끝나면 이용할 수 있습니다.
        </p>
      </div>
    </main>
  );
}
