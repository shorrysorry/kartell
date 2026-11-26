import { describe, expect, it } from "vitest";
import { isActivePath } from "./nav-items";

describe("isActivePath", () => {
  it("홈은 정확히 / 일 때만 활성", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/games", "/")).toBe(false);
  });

  it("하위 경로도 같은 메뉴로 본다", () => {
    expect(isActivePath("/games", "/games")).toBe(true);
    expect(isActivePath("/games/abc", "/games")).toBe(true);
  });

  it("접두사만 같은 다른 경로는 활성으로 보지 않는다", () => {
    expect(isActivePath("/gamesx", "/games")).toBe(false);
  });
});
