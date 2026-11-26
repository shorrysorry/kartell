import { createScoringRegistry } from "./registry";
import type { ScoringConfiguration } from "./types";

export type * from "./types";

// 지원 게임 계산기는 개발자가 calculators/<game>/ 에 구현한 뒤 여기에 등록한다.
// 공식 규칙이 제공되기 전에는 아무것도 등록하지 않는다 (docs/spec/03-games-scoring.md "게임 추가 절차").
const modules: readonly { configuration: ScoringConfiguration }[] = [];

export const scoringRegistry = createScoringRegistry(modules);
