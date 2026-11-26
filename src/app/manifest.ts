import type { MetadataRoute } from "next";

// docs/spec/09-technical-design.md "PWA 및 배포"
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "kartell",
    short_name: "kartell",
    description: "보드게임 모임 점수 계산과 플레이 기록",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
