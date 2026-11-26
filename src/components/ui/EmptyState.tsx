/** 데이터가 없을 때의 안내 한 줄 */
export function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="py-3 text-[14px] text-muted">{children}</p>;
}
