/**
 * [INPUT]: icon{ id, name, svg }, onCopy, onDelete
 * [OUTPUT]: 单个图标卡片，悬停展示操作
 * [POS]: icons 层，由 IconGrid 渲染
 * [PROTOCOL]: 新增卡片交互时同步 IconCard.css
 */

import { useState } from 'react';
import './IconCard.css';

// ─── 复制反馈态 ───────────────────────────────────────────
const useCopyFeedback = () => {
  const [copied, setCopied] = useState(false);
  const trigger = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return [copied, trigger];
};

// ─── IconCard ─────────────────────────────────────────────
export const IconCard = ({ icon, onCopy, onDelete }) => {
  const [copied, triggerCopy] = useCopyFeedback();

  const handleCopy = (e) => {
    e.stopPropagation();
    onCopy(icon);
    triggerCopy();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(icon.id);
  };

  return (
    <div className={`icon-card${copied ? ' icon-card--copied' : ''}`} onClick={handleCopy}>
      {/* ── SVG 预览 ── */}
      <div
        className="icon-card__preview"
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />

      {/* ── 名称 ── */}
      <span className="icon-card__name">{icon.name}</span>

      {/* ── 复制提示 ── */}
      {copied && <div className="icon-card__toast">已复制!</div>}

      {/* ── 悬停操作层 ── */}
      <div className="icon-card__actions">
        <button
          className="icon-card__action-btn icon-card__action-btn--delete"
          onClick={handleDelete}
          title="删除图标"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
