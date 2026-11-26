import type { ScoringConfiguration } from "./types";

type Selector = Pick<ScoringConfiguration, "gameId" | "expansionIds">;

function configurationKey({ gameId, expansionIds }: Selector): string {
  return `${gameId}::${[...expansionIds].sort().join("+")}`;
}

/**
 * 검증된 (게임 + 확장판 조합)만 계산기를 돌려준다.
 * 등록되지 않은 조합은 undefined → 기록 생성 불가 (총점 수동 입력으로 우회하지 않는다).
 * ruleVersion을 지정하지 않으면 마지막에 등록된 버전을 쓴다. 확정된 과거 기록은 저장된 ruleVersion으로 조회한다.
 */
export function createScoringRegistry<TModule extends { configuration: ScoringConfiguration }>(
  modules: readonly TModule[],
) {
  const byKey = new Map<string, TModule[]>();
  for (const entry of modules) {
    const key = configurationKey(entry.configuration);
    const versions = byKey.get(key) ?? [];
    if (versions.some((m) => m.configuration.ruleVersion === entry.configuration.ruleVersion)) {
      throw new Error(`중복 등록: ${key}@${entry.configuration.ruleVersion}`);
    }
    byKey.set(key, [...versions, entry]);
  }

  return {
    find(selector: Selector & { ruleVersion?: string }): TModule | undefined {
      const versions = byKey.get(configurationKey(selector));
      if (!versions) return undefined;
      if (selector.ruleVersion === undefined) return versions.at(-1);
      return versions.find((m) => m.configuration.ruleVersion === selector.ruleVersion);
    },
  };
}
