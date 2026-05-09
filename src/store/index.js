/**
 * [INPUT]: storage.js（持久层），id.js（ID 生成）
 * [OUTPUT]: useStore hook — 全局状态 + CRUD 操作
 * [POS]: store 层对外唯一出口，组件层通过此 hook 读写数据
 * [PROTOCOL]: 新增操作时在此文件添加，并更新 L2 CLAUDE.md
 */

import { useState, useCallback } from 'react';
import { loadData, saveData } from './storage';
import { genId } from '../utils/id';

// ─── 数据变更辅助 ──────────────────────────────────────────
const withSave = (updater) => (prev) => {
  const next = updater(prev);
  saveData(next);
  return next;
};

// ─── useStore ──────────────────────────────────────────────
export const useStore = () => {
  const [data, setData] = useState(loadData);

  // ── 分类操作 ────────────────────────────────────────────
  const addCategory = useCallback((name) => {
    const cat = { id: genId(), name: name.trim(), createdAt: Date.now() };
    setData(withSave((d) => ({ ...d, categories: [...d.categories, cat] })));
    return cat;
  }, []);

  const renameCategory = useCallback((id, name) => {
    setData(withSave((d) => ({
      ...d,
      categories: d.categories.map((c) =>
        c.id === id ? { ...c, name: name.trim() } : c
      ),
    })));
  }, []);

  const deleteCategory = useCallback((id) => {
    setData(withSave((d) => ({
      ...d,
      categories: d.categories.filter((c) => c.id !== id),
      // 该分类下的图标移入"未分类"（categoryId 置 null）
      icons: d.icons.map((ic) =>
        ic.categoryId === id ? { ...ic, categoryId: null } : ic
      ),
    })));
  }, []);

  // ── 图标操作 ────────────────────────────────────────────
  const addIcons = useCallback((items) => {
    // items: [{ name, svg, categoryId }]
    const icons = items.map((item) => ({
      id: genId(),
      name: item.name,
      svg: item.svg,
      categoryId: item.categoryId ?? null,
      createdAt: Date.now(),
    }));
    setData(withSave((d) => ({ ...d, icons: [...d.icons, ...icons] })));
  }, []);

  const deleteIcon = useCallback((id) => {
    setData(withSave((d) => ({
      ...d,
      icons: d.icons.filter((ic) => ic.id !== id),
    })));
  }, []);

  const moveIcon = useCallback((iconId, categoryId) => {
    setData(withSave((d) => ({
      ...d,
      icons: d.icons.map((ic) =>
        ic.id === iconId ? { ...ic, categoryId: categoryId ?? null } : ic
      ),
    })));
  }, []);

  return {
    categories: data.categories,
    icons: data.icons,
    addCategory,
    renameCategory,
    deleteCategory,
    addIcons,
    deleteIcon,
    moveIcon,
  };
};
