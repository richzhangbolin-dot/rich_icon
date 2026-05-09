# CLAUDE.md — L2 components/icons 模块

## 职责

图标展示层。网格容器和单张卡片。

## 成员清单

| 文件                  | 职责                                        |
|-----------------------|---------------------------------------------|
| `IconGrid.jsx / .css` | 响应式网格容器，空态占位                    |
| `IconCard.jsx / .css` | 单图标卡片：SVG 预览 + 复制 + 删除操作     |

## 关键交互

- 点击卡片 → 复制 SVG 代码，1.5s 绿色反馈
- 悬停卡片 → 右上角显示删除按钮
- `dangerouslySetInnerHTML` 渲染 SVG（已在上传时净化）

## 变更协议

- 新增卡片操作：修改 `IconCard.jsx` 和 `.css`
- 网格列数/间距：修改 `IconGrid.css`
