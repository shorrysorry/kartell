import { describe, expect, it } from "vitest";
import { createScoringRegistry } from "./registry";

const mod = (gameId: string, expansionIds: string[], ruleVersion: string) => ({
  configuration: { gameId, expansionIds, ruleVersion },
});

describe("createScoringRegistry", () => {
  it("등록되지 않은 게임은 계산기를 돌려주지 않는다", () => {
    const registry = createScoringRegistry([]);
    expect(registry.find({ gameId: "any", expansionIds: [] })).toBeUndefined();
  });

  it("확장판 조합은 순서와 무관하게 일치해야 한다", () => {
    const m = mod("g1", ["e1", "e2"], "1");
    const registry = createScoringRegistry([m]);
    expect(registry.find({ gameId: "g1", expansionIds: ["e2", "e1"] })).toBe(m);
  });

  it("검증되지 않은 확장판 조합은 지원하지 않는다", () => {
    const registry = createScoringRegistry([mod("g1", [], "1"), mod("g1", ["e1"], "1")]);
    expect(registry.find({ gameId: "g1", expansionIds: ["e1", "e2"] })).toBeUndefined();
  });

  it("규칙 버전을 지정하면 그 버전을, 생략하면 마지막 등록 버전을 돌려준다", () => {
    const v1 = mod("g1", [], "1");
    const v2 = mod("g1", [], "2");
    const registry = createScoringRegistry([v1, v2]);
    expect(registry.find({ gameId: "g1", expansionIds: [], ruleVersion: "1" })).toBe(v1);
    expect(registry.find({ gameId: "g1", expansionIds: [] })).toBe(v2);
  });

  it("같은 조합·버전을 두 번 등록하면 실패한다", () => {
    expect(() => createScoringRegistry([mod("g1", [], "1"), mod("g1", [], "1")])).toThrow();
  });
});
