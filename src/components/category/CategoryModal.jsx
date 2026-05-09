/**
 * [INPUT]: categories[], onAdd, onRename, onDelete, onClose
 * [OUTPUT]: 分类管理弹窗：增删改操作
 * [POS]: category 层，由 App 控制显隐
 * [PROTOCOL]: 新增分类操作时同步 L2 CLAUDE.md
 */

import { useState } from 'react';
import './CategoryModal.css';

// ─── 新增分类输入行 ────────────────────────────────────────
const AddCategoryRow = ({ onAdd }) => {
  const [value, setValue] = useState('');

  const commit = () => {
    const name = value.trim();
    if (!name) return;
    onAdd(name);
    setValue('');
  };

  const handleKey = (e) => e.key === 'Enter' && commit();

  return (
    <div className="cat-modal__add-row">
      <input
        className="cat-modal__input"
        placeholder="新分类名称..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        autoFocus
      />
      <button className="cat-modal__add-btn" onClick={commit}>添加</button>
    </div>
  );
};

// ─── 分类条目（支持行内重命名）────────────────────────────
const CategoryRow = ({ category, onRename, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(category.name);

  const commitRename = () => {
    const name = value.trim();
    if (name && name !== category.name) onRename(category.id, name);
    setEditing(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') commitRename();
    if (e.key === 'Escape') { setValue(category.name); setEditing(false); }
  };

  return (
    <div className="cat-row">
      {editing ? (
        <input
          className="cat-row__edit-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={commitRename}
          onKeyDown={handleKey}
          autoFocus
        />
      ) : (
        <span className="cat-row__name" onDoubleClick={() => setEditing(true)}>
          {category.name}
        </span>
      )}

      <div className="cat-row__actions">
        {!editing && (
          <button
            className="cat-row__btn"
            onClick={() => setEditing(true)}
            title="重命名"
          >
            ✎
          </button>
        )}
        <button
          className="cat-row__btn cat-row__btn--danger"
          onClick={() => onDelete(category.id)}
          title="删除分类（图标保留，移入未分类）"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// ─── CategoryModal ────────────────────────────────────────
export const CategoryModal = ({ categories, onAdd, onRename, onDelete, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="cat-modal" onClick={(e) => e.stopPropagation()}>
      {/* ── 头部 ── */}
      <div className="cat-modal__header">
        <h2 className="cat-modal__title">管理分类</h2>
        <button className="cat-modal__close" onClick={onClose}>✕</button>
      </div>

      {/* ── 新增行 ── */}
      <AddCategoryRow onAdd={onAdd} />

      {/* ── 分类列表 ── */}
      <div className="cat-modal__list">
        {categories.length === 0 && (
          <p className="cat-modal__empty">暂无分类，输入名称后按 Enter 添加</p>
        )}
        {categories.map((cat) => (
          <CategoryRow
            key={cat.id}
            category={cat}
            onRename={onRename}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  </div>
);
