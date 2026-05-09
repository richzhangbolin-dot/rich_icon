/**
 * [INPUT]: icons[], activeCategoryId, searchQuery
 * [OUTPUT]: 过滤后的 icons[]
 * [POS]: hooks 层，被 App 调用
 * [PROTOCOL]: 过滤逻辑变更时更新此文件
 */

import { useMemo } from 'react';

// ─── 按分类过滤 ───────────────────────────────────────────
const filterByCategory = (icons, catId) => {
  if (catId === null) return icons;
  if (catId === '__uncategorized__') return icons.filter((ic) => !ic.categoryId);
  return icons.filter((ic) => ic.categoryId === catId);
};

// ─── 按关键词过滤 ─────────────────────────────────────────
const filterBySearch = (icons, query) => {
  if (!query.trim()) return icons;
  const q = query.toLowerCase();
  return icons.filter((ic) => ic.name.toLowerCase().includes(q));
};

// ─── useIconFilter ────────────────────────────────────────
export const useIconFilter = (icons, activeCategoryId, searchQuery) =>
  useMemo(
    () => filterBySearch(filterByCategory(icons, activeCategoryId), searchQuery),
    [icons, activeCategoryId, searchQuery]
  );
