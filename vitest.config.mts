import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// 현재는 순수 함수(점수 계산 등) 테스트만 있다.
// 컴포넌트 테스트가 필요해지면 jsdom + @testing-library/react를 추가한다 (jsdom 29는 Node 22.22+ 필요).
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
