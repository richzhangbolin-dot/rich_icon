/**
 * [INPUT]: categories[], defaultCategoryId, onAdd(items[]), onClose
 * [OUTPUT]: 批量上传弹窗：拖拽区 + 分类选择 + 预览列表
 * [POS]: upload 层，由 App 控制显隐
 * [PROTOCOL]: 上传流程变更时同步 UploadModal.css
 */

import { useState, useRef, useCallback } from 'react';
import { readSvgFile, filterSvgFiles, fileToName } from '../../utils/svg';
import './UploadModal.css';

// ─── 拖拽区 ───────────────────────────────────────────────
const DropZone = ({ onFiles }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    onFiles(filterSvgFiles(e.dataTransfer.files));
  }, [onFiles]);

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleChange = (e) => onFiles(filterSvgFiles(e.target.files));

  return (
    <div
      className={`drop-zone${dragging ? ' drop-zone--drag' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".svg,image/svg+xml"
        multiple
        hidden
        onChange={handleChange}
      />
      <div className="drop-zone__icon">↑</div>
      <p className="drop-zone__title">拖拽 SVG 文件到这里</p>
      <p className="drop-zone__hint">或点击选择文件 · 支持批量</p>
    </div>
  );
};

// ─── 预览条目 ─────────────────────────────────────────────
const PreviewItem = ({ item, onRemove }) => (
  <div className="preview-item">
    <div
      className="preview-item__svg"
      dangerouslySetInnerHTML={{ __html: item.svg }}
    />
    <span className="preview-item__name">{item.name}</span>
    <button className="preview-item__remove" onClick={() => onRemove(item.id)}>✕</button>
  </div>
);

// ─── UploadModal ──────────────────────────────────────────
export const UploadModal = ({ categories, defaultCategoryId, onAdd, onClose }) => {
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(defaultCategoryId ?? '');
  const [loading, setLoading] = useState(false);

  const handleFiles = useCallback(async (files) => {
    if (!files.length) return;
    setLoading(true);
    const results = await Promise.all(
      files.map(async (file) => ({
        id: `${Date.now()}-${Math.random()}`,
        name: fileToName(file.name),
        svg: await readSvgFile(file),
      }))
    );
    setItems((prev) => [...prev, ...results]);
    setLoading(false);
  }, []);

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const handleConfirm = () => {
    if (!items.length) return;
    onAdd(items.map(({ name, svg }) => ({
      name,
      svg,
      categoryId: categoryId || null,
    })));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        {/* ── 头部 ── */}
        <div className="upload-modal__header">
          <h2 className="upload-modal__title">上传 SVG 图标</h2>
          <button className="upload-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* ── 拖拽区 ── */}
        <DropZone onFiles={handleFiles} />

        {/* ── 分类选择 ── */}
        <div className="upload-modal__category">
          <label className="upload-modal__label">目标分类</label>
          <select
            className="upload-modal__select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">未分类</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* ── 预览列表 ── */}
        {items.length > 0 && (
          <div className="upload-modal__preview">
            <div className="upload-modal__preview-header">
              <span className="upload-modal__preview-count">
                已选 {items.length} 个图标
              </span>
              <button
                className="upload-modal__clear"
                onClick={() => setItems([])}
              >
                清空
              </button>
            </div>
            <div className="preview-list">
              {items.map((item) => (
                <PreviewItem key={item.id} item={item} onRemove={removeItem} />
              ))}
            </div>
          </div>
        )}

        {loading && <div className="upload-modal__loading">解析中...</div>}

        {/* ── 操作按钮 ── */}
        <div className="upload-modal__footer">
          <button className="upload-modal__cancel" onClick={onClose}>取消</button>
          <button
            className="upload-modal__confirm"
            onClick={handleConfirm}
            disabled={!items.length}
          >
            添加 {items.length > 0 ? `${items.length} 个` : ''}图标
          </button>
        </div>
      </div>
    </div>
  );
};
