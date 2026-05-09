/**
 * [INPUT]: 无（根组件）
 * [OUTPUT]: 完整的图标管理工具 UI
 * [POS]: 应用根，挂载所有顶层模块
 * [PROTOCOL]: 新增顶层功能模块时在此注册，并更新 L1 CLAUDE.md
 */

import { useState, useCallback } from 'react';
import { useStore } from './store/index';
import { useIconFilter } from './hooks/useIconFilter';
import { Topbar } from './components/layout/Topbar';
import { CategorySidebar } from './components/layout/CategorySidebar';
import { IconGrid } from './components/icons/IconGrid';
import { UploadModal } from './components/upload/UploadModal';
import { CategoryModal } from './components/category/CategoryModal';
import './App.css';

// ─── 弹窗状态枚举 ─────────────────────────────────────────
const MODAL = { NONE: 'none', UPLOAD: 'upload', CATEGORY: 'category' };

// ─── App ──────────────────────────────────────────────────
export default function App() {
  const store = useStore();

  // ── UI 状态 ──────────────────────────────────────────────
  const [modal, setModal] = useState(MODAL.NONE);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ── 过滤图标 ─────────────────────────────────────────────
  const visibleIcons = useIconFilter(store.icons, activeCategoryId, searchQuery);

  // ── 复制 SVG ─────────────────────────────────────────────
  const handleCopy = useCallback((icon) => {
    navigator.clipboard.writeText(icon.svg).catch(() => {
      const el = document.createElement('textarea');
      el.value = icon.svg;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    });
  }, []);

  // ── 分类选择时重置搜索 ────────────────────────────────────
  const handleSelectCategory = (id) => {
    setActiveCategoryId(id);
    setSearchQuery('');
  };

  // ── 当前分类标题 ─────────────────────────────────────────
  const categoryTitle = () => {
    if (activeCategoryId === null) return '全部图标';
    if (activeCategoryId === '__uncategorized__') return '未分类';
    return store.categories.find((c) => c.id === activeCategoryId)?.name ?? '';
  };

  return (
    <div className="app">
      {/* ── 顶部导航 ── */}
      <Topbar
        onUpload={() => setModal(MODAL.UPLOAD)}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* ── 主内容区 ── */}
      <div className="app__body">
        <CategorySidebar
          categories={store.categories}
          icons={store.icons}
          activeCategoryId={activeCategoryId}
          onSelect={handleSelectCategory}
          onManage={() => setModal(MODAL.CATEGORY)}
        />

        {/* ── 图标内容区 ── */}
        <main className="app__main">
          <div className="app__content-header">
            <h1 className="app__content-title">{categoryTitle()}</h1>
            <span className="app__content-count">{visibleIcons.length} 个</span>
          </div>

          <IconGrid
            icons={visibleIcons}
            onCopy={handleCopy}
            onDelete={store.deleteIcon}
            searchQuery={searchQuery}
          />
        </main>
      </div>

      {/* ── 弹窗层 ── */}
      {modal === MODAL.UPLOAD && (
        <UploadModal
          categories={store.categories}
          defaultCategoryId={
            activeCategoryId !== '__uncategorized__' ? activeCategoryId : null
          }
          onAdd={store.addIcons}
          onClose={() => setModal(MODAL.NONE)}
        />
      )}

      {modal === MODAL.CATEGORY && (
        <CategoryModal
          categories={store.categories}
          onAdd={store.addCategory}
          onRename={store.renameCategory}
          onDelete={store.deleteCategory}
          onClose={() => setModal(MODAL.NONE)}
        />
      )}
    </div>
  );
}
