/**
 * [INPUT]: icons[], onCopy, onDelete
 * [OUTPUT]: 瀑布网格，渲染 IconCard 列表
 * [POS]: icons 层，主内容区核心
 * [PROTOCOL]: 网格列数变更时同步 IconGrid.css
 */

import { IconCard } from './IconCard';
import './IconGrid.css';

// ─── 空态占位 ─────────────────────────────────────────────
const EmptyState = ({ hasSearch }) => (
  <div className="icon-grid__empty">
    <div className="icon-grid__empty-icon">◇</div>
    <p className="icon-grid__empty-title">
      {hasSearch ? '没有匹配的图标' : '暂无图标'}
    </p>
    <p className="icon-grid__empty-hint">
      {hasSearch ? '换个关键词试试' : '点击右上角「上传图标」开始'}
    </p>
  </div>
);

// ─── IconGrid ─────────────────────────────────────────────
export const IconGrid = ({ icons, onCopy, onDelete, searchQuery }) => {
  if (!icons.length) return <EmptyState hasSearch={!!searchQuery} />;

  return (
    <div className="icon-grid">
      {icons.map((icon) => (
        <IconCard
          key={icon.id}
          icon={icon}
          onCopy={onCopy}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
