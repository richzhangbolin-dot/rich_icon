/**
 * [INPUT]: 无
 * [OUTPUT]: 生成唯一 ID 的工具函数
 * [POS]: utils 层，被 store 调用
 * [PROTOCOL]: 仅修改生成策略时更新此头部
 */

// ─── ID 生成 ───────────────────────────────────────────────
export const genId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
