# AGENTS.md

이 레포에서 작업하는 코딩 에이전트(Codex, Claude Code 등)를 위한 지침.
원문: [docs/spec/10-roadmap-codex.md](docs/spec/10-roadmap-codex.md) "Codex 전달용 지시문". 내용이 다르면 원문이 우선한다.

## 먼저 읽을 것

- `docs/spec/README.md`와 `docs/spec/01`~`10` 문서를 모두 읽는다.
- 최신 **확정** 요구사항을 우선한다. **설계안**과 **미결** 사항을 확정 요구사항으로 오인하지 않는다.

## 현재 단계의 경계

- 지금은 UI 프로토타입 통합과 기획 검증 단계다.
- 프로젝트 초기 세팅은 2026-11-26 요청에 따라 완료했다 → [docs/architecture.md](docs/architecture.md).
- 실서비스 DB, 인증 연동, Service Worker·Web Push, 배포는 별도 요청 전에는 시작하지 않는다.
- 이미 있는 구조와 구현을 먼저 확인하고, 기존 기능을 임의로 삭제하거나 덮어쓰지 않는다.

## 작업 원칙

- 통합 UI는 Mock Data로 만들고, 권한과 상태 전이를 검증할 수 있게 구현한다.
- v0.2의 절제된 리스트 기반 디자인을 유지한다.
- 게임별 점수 계산은 개발자가 제공한 규칙만 사용한다. 제공되지 않은 점수식·확장판·동점 규칙은 추정하지 않는다.
- 개발자가 검증한 지원 게임만 기록 가능하게 한다. 임시 데이터나 예시 계산을 운영 기능으로 표시하지 않는다.
- 실제 개발 요청 이후에는 작은 기능 단위로 구현하고, 변경마다 테스트·미결 사항·권한 검증 결과를 문서에 기록한다.
- 보안 검증을 UI 노출 제한으로 대체하지 않는다.
- 회원·기록·일정 권한, 원본 기록 보존, 활동 기반 업적의 점진적 확장 원칙을 유지한다.

## 검증 명령

변경 후 `npm run test:run`, `npm run typecheck`, `npm run lint`를 통과시킨다. 빌드에 영향을 주는 변경은 `npm run build`까지 확인한다.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
