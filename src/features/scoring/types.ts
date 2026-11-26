// 게임별 점수 계산 모듈의 공통 계약 (docs/spec/03-games-scoring.md "모듈 구조 설계안")
// 게임별 입력값·점수 항목·결과 규칙은 각 calculators/<game>/ 모듈이 정한다.

/** 계산기를 고르는 기준: 게임 + 확장판 조합 + 규칙 버전 */
export interface ScoringConfiguration {
  gameId: string;
  expansionIds: readonly string[];
  ruleVersion: string;
}

export interface ParticipantInput<TRawInput> {
  memberId: string;
  characterId?: string;
  raw: TRawInput;
}

export interface ParticipantResult<TOutcome> {
  memberId: string;
  /** 항목별 세부 점수 */
  breakdown: Readonly<Record<string, number>>;
  total: number;
  /** 공동 순위 허용 */
  rank: number;
  /** 승패·결과 표현은 게임마다 다르다 */
  outcome: TOutcome;
}

export interface ScoringResult<TOutcome> {
  ruleVersion: string;
  participants: readonly ParticipantResult<TOutcome>[];
}

/**
 * 게임 하나(+확장판 조합)의 계산 모듈.
 * calculate는 순수 함수여야 한다 — 프론트 즉시 계산과 서버 검증이 같은 함수를 쓴다.
 */
export interface ScoringModule<TRawInput, TSharedInput, TOutcome> {
  configuration: ScoringConfiguration;
  calculate(input: {
    participants: readonly ParticipantInput<TRawInput>[];
    shared: TSharedInput;
  }): ScoringResult<TOutcome>;
}
