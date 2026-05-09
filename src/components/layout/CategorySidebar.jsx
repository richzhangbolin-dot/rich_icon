/**
 * [INPUT]: categories[], icons[]（计数用）, activeCategoryId, onSelect, onManage
 * [OUTPUT]: 左侧分类导航栏
 * [POS]: layout 层，App 直接挂载
 * [PROTOCOL]: 样式变更同步 CategorySidebar.css
 */

import './CategorySidebar.css';

// ─── 图标数量徽章 ──────────────────────────────────────────
const CountBadge = ({ count }) => (
  <span className="cat-badge">{count}</span>
);

// ─── 单条分类项 ────────────────────────────────────────────
const CategoryItem = ({ label, count, active, onClick }) => (
  <button
    className={`cat-item${active ? ' cat-item--active' : ''}`}
    onClick={onClick}
  >
    <span className="cat-item__name">{label}</span>
    <CountBadge count={count} />
  </button>
);

// ─── CategorySidebar ──────────────────────────────────────
export const CategorySidebar = ({
  categories,
  icons,
  activeCategoryId,
  onSelect,
  onManage,
}) => {
  const countFor = (catId) =>
    icons.filter((ic) => ic.categoryId === catId).length;

  const uncategorizedCount = icons.filter((ic) => !ic.categoryId).length;

  return (
    <aside className="cat-sidebar">
      {/* ── 标题行 ── */}
      <div className="cat-sidebar__header">
        <span className="cat-sidebar__title">分类</span>
        <button className="cat-manage-btn" onClick={onManage} title="管理分类">
          ⚙
        </button>
      </div>

      {/* ── 全部 ── */}
      <CategoryItem
        label="全部图标"
        count={icons.length}
        active={activeCategoryId === null}
        onClick={() => onSelect(null)}
      />

      {/* ── 未分类 ── */}
      {uncategorizedCount > 0 && (
        <CategoryItem
          label="未分类"
          count={uncategorizedCount}
          active={activeCategoryId === '__uncategorized__'}
          onClick={() => onSelect('__uncategorized__')}
        />
      )}

      {/* ── 用户分类 ── */}
      <div className="cat-sidebar__divider" />
      {categories.map((cat) => (
        <CategoryItem
          key={cat.id}
          label={cat.name}
          count={countFor(cat.id)}
          active={activeCategoryId === cat.id}
          onClick={() => onSelect(cat.id)}
        />
      ))}
    </aside>
  );
};
