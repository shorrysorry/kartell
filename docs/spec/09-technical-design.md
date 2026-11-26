# 09. 기술 설계 초안 (실제 개발 전 확정 필요)

## 기술 방향
Next.js + TypeScript + PWA + Vercel. Supabase(PostgreSQL/Auth/Storage) 또는 다른 DB는 후보이며 확정하지 않았다. 카카오 OAuth 인증과 서비스 자체 회원 승인/권한을 분리. 인증 라이브러리 선택, 서버 런타임, DB 호스팅, 비용/쿼터/비상업적 사용 조건은 개발 시 검토. EC2는 초기 운영 복잡성 때문에 우선 제외.

## 데이터 모델 초안
| 엔티티 | 핵심 필드/관계 |
|---|---|
| Member | id, providerSubject, name, avatarRef, status, role, createdAt, approvedAt |
| MemberPermission | memberId, permission(RECORD_CREATE/EVENT_CREATE), grantedBy/At, revokedAt |
| Game | id, externalId, metadata, categories, supportStatus, assetRights |
| GameExpansion | id, gameId, metadata |
| GameCharacter | id, gameId, expansionId, name |
| ScoringRule | gameId, configurationKey, version, supported |
| PlayRecord | id, gameId, creatorId, playedOn, status, ruleVersion, revision, memo, timestamps |
| PlayParticipant | recordId, memberId, character/faction refs, inputs, breakdown, total, rank, outcome |
| PlayExpansion | recordId, expansionId |
| Media | id, ownerId, targetType/Id, private storage key, timestamps |
| Post / Comment / Like | 작성자, 본문, 상태, 관계, timestamps |
| Event / Registration / Attendance | 일정, 신청, 실제 출석 분리 |
| AchievementDefinition | key, version, condition, tier, icon, enabled |
| MemberAchievement | memberId, achievementKey, tier, earnedAt, evaluatedAt |
| MemberRepresentative | memberId, achievementKey, tier |
| Notification / PushSubscription / Preference | 수신자, 이벤트, 읽음, 기기 구독, 설정 |
| AuditLog | actor, action, target, before/after, reason, timestamp |

관계형 식별자 및 제약 조건으로 무결성 유지. 게임별 입력은 버전이 명시된 JSON 구조 등을 검토. 참가자 중복 및 업적 중복 방지. 공개 요약과 비공개 원본을 분리. 삭제 정책은 법적/서비스 요구에 맞게 별도 설계.

## API 책임 초안 (경로 미확정)
- 인증: OAuth callback, 세션 확인, 신규 프로필, 가입 상태 조회, 로그아웃/탈퇴.
- 관리자: 가입 신청 조회/승인/거절, 회원 비활성화, 권한 부여/회수, 기록/일정 관리 및 감사 로그.
- 게임: 목록/검색/상세/지원 조합 조회; 일반 사용자 등록/편집 API 없음.
- 기록: 생성, 목록(참가/본인 생성), 상세, 미확정 수정/삭제, 확정 전용 명령, 관리자 수정/삭제.
- 통계/업적: 개인 게임별 요약, 모임 인기/최고 점수 요약, 내 컬렉션, 대표 토큰 설정.
- 게시판: 목록/검색/상세, 작성/수정/삭제, 댓글/좋아요.
- 일정: 목록/상세, 생성/변경, 신청/취소, 출석 확인/종료.
- 알림: 목록/읽음/설정, push 구독 등록/해제.

## 권한 및 무결성
모든 서버 요청에 현재 회원 상태와 동작별 권한 검증. 클라이언트에서 전달한 memberId, role, final score, rank를 신뢰하지 않는다. 참가/생성 관계와 상태를 DB에서 검증. DB RLS를 도입한다면 서버 서비스 계정 사용 경로에도 동일한 권한 검사 필요. 비공개 사진은 서명 URL 등 접근 제한 방식 검토. 기록 확정 시 동일 트랜잭션에서 상태/revision 검사와 서버 재계산, 참가자 결과 저장. 후속 알림/업적 처리 중복 방지. 일정 정원은 트랜잭션 기반 동시 신청 검증. 감사 로그에는 토큰/개인정보 원문을 불필요하게 남기지 않는다.

## PWA 및 배포
manifest: name/short_name, icons(일반/maskable), start_url, scope, standalone, theme/background. HTTPS 및 iOS/Android 홈 화면 설치 안내. Service Worker 캐싱 정책과 업데이트 적용 UX, 오프라인 시 입력 임시 보존(정식 오프라인 동기화는 미결). 인증된 응답이나 다른 회원 데이터가 공유 캐시에 남지 않도록 한다. 카카오 OAuth redirect URI/환경변수 분리, 비밀키 서버 저장. Vercel preview/production 구분, DB migration 및 롤백 절차. 스토어 배포 없음. 푸시/배지 지원 차이는 실기기 검증.

## 테스트 및 완료 기준 초안
- 인증: 신규/기존, 승인 대기/거절/탈퇴, 세션 회수, 카카오 연결 해제 처리.
- 권한: 모든 역할 조합 및 비참가자 직접 API/사진 접근 차단; 관리자 예외.
- 게임: 공식 점수표 정상/경계/동점/확장판, 미지원 차단, 규칙 버전 보존.
- 기록: 대리 작성, 수정/삭제/확정, 동시 요청, 중복 방지, 관리자 수정 후 집계.
- 일정: 선택 정원, 동시 신청, 시작 전/후 취소, 실제 출석과 신청 구분.
- 커뮤니티: 작성자/관리자 권한, 입력 안전성, 삭제/중복 좋아요.
- 업적: 확정 원본 기반, 소급 평가, 중복 방지, 삭제/수정 재평가, 대표 토큰.
- PWA: iPhone/Android 설치/재실행, OAuth 복귀, 푸시 권한/수신/딥링크/배지, 업데이트, 네트워크 오류.

기술 상세 설계는 통합 프로토타입 검증 이후 수행. 위 엔티티/경로는 구현 계약으로 확정된 것이 아니다.
