/**
 * [INPUT]: SVG 文件 File 对象
 * [OUTPUT]: 清洗后的 SVG 字符串
 * [POS]: utils 层，被 UploadZone 调用
 * [PROTOCOL]: 安全清洗规则变更时更新此文件
 */

// ─── 文件名 → 图标名 ──────────────────────────────────────
export const fileToName = (filename) =>
  filename.replace(/\.svg$/i, '').replace(/[-_]/g, ' ');

// ─── SVG 安全清洗 ─────────────────────────────────────────
// 移除 script/外链，保留纯图形内容
const DANGEROUS_TAGS = /<(script|iframe|object|embed|link|meta)[^>]*>[\s\S]*?<\/\1>/gi;
const DANGEROUS_ATTRS = /\s(on\w+|href\s*=\s*["']javascript)[^"']*["']/gi;

export const sanitizeSvg = (raw) =>
  raw.replace(DANGEROUS_TAGS, '').replace(DANGEROUS_ATTRS, '');

// ─── File → SVG 字符串（Promise）─────────────────────────
export const readSvgFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(sanitizeSvg(e.target.result));
    reader.onerror = reject;
    reader.readAsText(file);
  });

// ─── 过滤出 SVG 文件 ──────────────────────────────────────
export const filterSvgFiles = (files) =>
  Array.from(files).filter(
    (f) => f.type === 'image/svg+xml' || f.name.toLowerCase().endsWith('.svg')
  );
