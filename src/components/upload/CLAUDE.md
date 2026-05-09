# CLAUDE.md — L2 components/upload 模块

## 职责

SVG 文件上传弹窗。拖拽 / 点击选择，批量解析，净化后写入 store。

## 成员清单

| 文件                      | 职责                                      |
|---------------------------|-------------------------------------------|
| `UploadModal.jsx / .css`  | 上传弹窗：拖拽区 + 分类选择 + 预览列表   |

## 安全说明

SVG 在写入 store 前经 `utils/svg.js` 的 `sanitizeSvg` 净化，移除 `<script>`、`<iframe>` 等危险标签及 `on*` 事件属性。

## 变更协议

- 净化规则变更：修改 `utils/svg.js`，同步本文件"安全说明"节
- 新增上传选项：修改 `UploadModal.jsx`
