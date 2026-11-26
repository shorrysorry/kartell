import { ClipboardList, Dices, House, MessagesSquare, User, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

/** 하단 메뉴 (docs/spec/08-ia-ui.md) */
export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "홈", icon: House },
  { href: "/games", label: "게임", icon: Dices },
  { href: "/records", label: "기록", icon: ClipboardList },
  { href: "/community", label: "커뮤니티", icon: MessagesSquare },
  { href: "/my", label: "MY", icon: User },
];

/** 현재 경로가 메뉴 항목에 속하는지. 홈은 정확히 "/"일 때만. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
