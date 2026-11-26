# kartell

단일 보드게임 모임 전용 모바일 PWA.
게임별 점수 계산, 참가자 간 플레이 기록 공유, 모임 활동 기반 업적을 제공한다.

> **현재 단계: 초기 세팅 완료 · 통합 프로토타입 준비.** DB, 인증 연동, 배포는 아직 시작하지 않았다.

## 핵심 결정

- 대상: 개발자가 참여 중인 보드게임 모임 하나. 불특정 다수 대상 서비스가 아님
- 플랫폼: Next.js · TypeScript · PWA · Vercel (DB·Auth는 미확정)
- 인증: 카카오 로그인 + 관리자 가입 승인
- 기록: 참가자·생성자·관리자만 열람. 생성자가 확정하면 이후 관리자만 수정
- 게임·점수 계산기: 개발자가 코드로만 추가 (검증된 확장판 조합만 지원)
- 커뮤니티: 자유게시판 + 일정관리(신청·출석)
- 디자인: 화이트·차콜, 리스트 중심, 장식 최소화 (v0.2 기준)

## 개발

Node.js 22 (`.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:3000
npm run test:run   # Vitest
npm run typecheck  # next typegen + tsc
npm run lint
npm run build
```

구조와 보류한 항목: [docs/architecture.md](docs/architecture.md)

## 문서

명세 원본은 [`docs/spec/`](docs/spec/)에 있다. 읽는 법(확정 / 설계안 / 미결)은 [docs/spec/README.md](docs/spec/README.md)를 먼저 본다.

| 문서 | 내용 |
|---|---|
| [01 서비스 정의](docs/spec/01-product.md) | 서비스 정의, MVP 범위, 디자인 원칙 |
| [02 회원·권한](docs/spec/02-members-permissions.md) | 인증, 회원 상태, 권한 매트릭스 |
| [03 게임·점수 계산](docs/spec/03-games-scoring.md) | 게임 카탈로그, 계산기 모듈, 확장판, 자료 라이선스 |
| [04 플레이 기록](docs/spec/04-play-records.md) | 기록 데이터, 생성 흐름, 상태, 예외 처리 |
| [05 통계·업적](docs/spec/05-stats-achievements.md) | 통계, 랭킹, 활동 기반 업적 |
| [06 커뮤니티·일정](docs/spec/06-community-schedule.md) | 자유게시판, 일정, 출석 |
| [07 알림](docs/spec/07-notifications.md) | 알림 정책 초안 (미확정) |
| [08 IA·UI](docs/spec/08-ia-ui.md) | 정보 구조, 디자인 시스템, 프로토타입 이력 |
| [09 기술 설계](docs/spec/09-technical-design.md) | 데이터 모델, API 책임, 보안, 테스트 |
| [10 로드맵](docs/spec/10-roadmap-codex.md) | 진행 현황, 미결 사항, 에이전트 작업 지침 |

## 다음 할 일

알림 정책 확정 → IA·MVP 최종 검토 → 통합 모바일 프로토타입 → 사용성 검증 → DB/API 상세 설계 → 실제 개발.
상세: [10 로드맵](docs/spec/10-roadmap-codex.md)
