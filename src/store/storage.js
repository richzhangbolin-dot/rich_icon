/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: localStorage 的原子读写函数
 * [POS]: store 层最底层，所有持久化操作的出口
 * [PROTOCOL]: 变更 KEY 时同步更新 CLAUDE.md L1 数据结构节
 */

// ─── 存储键 ────────────────────────────────────────────────
const STORAGE_KEY = 'rich_icon_data';

// ─── 默认空数据 ────────────────────────────────────────────
const EMPTY = { categories: [], icons: [] };

// ─── 读取 ──────────────────────────────────────────────────
export const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : structuredClone(EMPTY);
  } catch {
    return structuredClone(EMPTY);
  }
};

// ─── 写入 ──────────────────────────────────────────────────
export const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
