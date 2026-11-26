# 아키텍처 (초기 세팅 기준)

> 근거: [09 기술 설계](spec/09-technical-design.md), [03 게임·점수 계산](spec/03-games-scoring.md), [08 IA·UI](spec/08-ia-ui.md).
> 명세에서 **확정**된 것만 세팅했다. 설계안·미결 항목은 "보류"로 남긴다.

## 기술 스택

| 영역 | 선택 | 상태 |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) · React 19 · TypeScript | 확정 (명세) |
| 스타일 | Tailwind CSS 4 + 디자인 토큰 (`src/app/globals.css`) | 초기 세팅 시 선택 |
| 테스트 | Vitest (순수 함수) | 초기 세팅 시 선택 |
| PWA | Next.js 내장 manifest (`src/app/manifest.ts`) | 확정 (명세) |
| 배포 | Vercel | 확정 (명세), 프로젝트 연결은 미실행 |
| DB · Auth · Storage | — | **미결** (Supabase 등 후보) |
| 런타임 | Node.js 22 (`.nvmrc`) | Vitest 5 요구사항 |

## 디렉터리

```
src/
  app/                    라우트 (App Router)
    layout.tsx            루트: lang=ko, viewport, 메타데이터
    (auth)/login/         카카오 로그인 (OAuth 연동 전, 버튼 비활성)
    (main)/layout.tsx     회원 화면 공통 틀: 상단 헤더 + 하단 메뉴
    (main)/page.tsx       홈 · games · records · community · my · notifications
    manifest.ts           PWA manifest
    icon.png, apple-icon.png
    globals.css           디자인 토큰 v0.2
  components/
    layout/               AppHeader · BottomNav · nav-items(+test)
    ui/                   Button · Section · EmptyState · PageTitle
  features/               도메인별 코드
    scoring/              게임별 점수 계산 (03 문서)
      types.ts            계산 모듈 공통 계약
      registry.ts         게임 + 확장판 조합 + 규칙 버전 → 모듈 선택
      index.ts            등록 목록 (현재 비어 있음)
      calculators/<game>/ config.ts · types.ts · ScoreSheet.tsx · calculate.ts · calculate.test.ts
public/icons/             PWA 아이콘 (임시)
docs/spec/                기획 명세 원본
```

### 앞으로 추가할 도메인 (만들 때 폴더 생성)

명세의 도메인 구분을 `src/features/` 하위 폴더로 맞춘다. 빈 폴더는 미리 만들지 않는다.

| 폴더 | 명세 |
|---|---|
| `features/members` | 02 회원·권한 |
| `features/games` | 03 게임 카탈로그 |
| `features/records` | 04 플레이 기록 |
| `features/stats`, `features/achievements` | 05 통계·업적 |
| `features/community`, `features/schedule` | 06 커뮤니티·일정 |
| `features/notifications` | 07 알림 |
| `features/admin` | 02 관리자 기능 |

라우트는 08의 하단 메뉴(홈 · 게임 · 기록 · 커뮤니티 · MY)를 따른다. 현재는 **뼈대만** 있다.

- 각 탭은 08 IA의 섹션 제목과 빈 상태 안내만 둔다. Mock 데이터 · 상세 · 생성 흐름은 통합 프로토타입에서 붙인다.
- 아직 없는 라우트: 신규 프로필 · 승인 대기 · 이용 제한, 게임/기록/게시글/일정 상세, 기록 생성 4단계, 관리자.
- 인증이 없으므로 `(main)` 접근 제어도 없다. 회원 상태 분기는 인증 방식 확정 후 서버에서 처리한다 (02).
- 공통 UI는 `components/ui`에 두고, 도메인 화면 조각은 해당 `features/<domain>`에 둔다.
- 아이콘은 `lucide-react` (08: Lucide 스타일 선 아이콘).

## 점수 계산 모듈 규칙

- `calculate`는 **순수 함수**. 프론트 즉시 계산과 서버 검증이 같은 함수를 쓴다.
- 레지스트리는 **등록된 (게임 + 확장판 조합)만** 돌려준다. 없으면 기록 생성 불가.
- 확장판 순서는 무관하고, 조합이 정확히 같아야 한다.
- 확정된 과거 기록은 저장된 `ruleVersion`으로 계산기를 찾는다. 새 버전으로 재계산하지 않는다.
- 공식 규칙이 제공되기 전에는 계산기를 등록하지 않는다. 예시 계산을 운영 기능으로 두지 않는다.

## 보류한 것과 이유

| 항목 | 이유 | 결정 시점 |
|---|---|---|
| Service Worker · 캐싱 | 캐싱 정책 미결, 인증 응답이 공유 캐시에 남지 않게 설계 필요 (09) | 알림·오프라인 정책 확정 후 |
| Web Push | 채널은 확정(07, 첫 출시 포함). 이벤트별 수신·공통 규칙 미결, iOS 홈 화면 웹앱 실기기 검증 필요 | 07 이벤트 확정 후 |
| DB · 인증 · Storage | 후보만 있음 (09) | 통합 프로토타입 검증 후 |
| 컴포넌트 테스트 (jsdom · Testing Library) | 뼈대 컴포넌트는 표시만 함. jsdom 29는 Node 22.22+ 필요 | 상호작용이 생기는 화면 구현 시 |
| Pretendard 웹폰트 로딩 | 현재는 설치된 경우에만 사용, 없으면 시스템 폰트 | 디자인 확정 시 |
| 정식 아이콘 | 현재 차콜 배경 + `k` 임시본 | 디자인 확정 시 |
| 다크 모드 | 명세는 화이트/차콜 단일 테마 | — |
