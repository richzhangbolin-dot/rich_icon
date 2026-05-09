/**
 * [INPUT]: onUpload（触发上传弹窗）, searchQuery, onSearch
 * [OUTPUT]: 顶部导航栏：logo + 搜索框 + 上传按钮
 * [POS]: layout 层，App 顶部
 * [PROTOCOL]: 新增顶部入口时在此添加
 */

import './Topbar.css';

// ─── Topbar ───────────────────────────────────────────────
export const Topbar = ({ onUpload, searchQuery, onSearch }) => (
  <header className="topbar">
    <div className="topbar__logo">
      <span className="topbar__logo-icon">⬡</span>
      <span className="topbar__logo-text">Rich Icon</span>
    </div>

    <div className="topbar__search">
      <span className="topbar__search-icon">⌕</span>
      <input
        type="text"
        placeholder="搜索图标..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="topbar__search-input"
      />
      {searchQuery && (
        <button className="topbar__search-clear" onClick={() => onSearch('')}>✕</button>
      )}
    </div>

    <button className="topbar__upload-btn" onClick={onUpload}>
      ↑ 上传图标
    </button>
  </header>
);
