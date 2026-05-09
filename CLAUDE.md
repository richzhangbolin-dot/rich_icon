# CLAUDE.md — L1 项目宪法

## 项目身份

**Rich Icon** — 无后端 SVG 图标管理工具。
灵感来自 centralicons.com，所有数据存于 localStorage。

## 技术栈

- React 18 + Vite
- 纯 CSS（无 UI 框架）
- localStorage（无后端、无服务器）

## 目录结构

```
src/
  store/          # 数据层：localStorage CRUD
  components/     # UI 组件
    layout/       # Topbar、Sidebar
    icons/        # IconGrid、IconCard
    upload/       # UploadZone
    category/     # CategoryModal
    common/       # SearchBar、Button 等通用组件
  hooks/          # 自定义 React Hooks
  utils/          # 纯函数工具
  App.jsx         # 根组件，组装布局
  main.jsx        # 挂载入口
```

每个目录下有 L2 CLAUDE.md，每个业务文件头有 L3 契约注释。

## 核心数据结构

```js
// localStorage key: "rich_icon_data"
{
  categories: [{ id, name, createdAt }],
  icons: [{ id, name, svg, categoryId, createdAt }]
}
```

## 代码哲学（强制执行）

- 函数 ≤ 20 行，超过立即拆分
- 缩进 ≤ 3 层，超过重构
- 每文件 ≤ 800 行
- 优先消除分支而非写对分支
- 中文注释 + ASCII 分块风格

## 变更协议

1. 修改任何文件后，检查其 L3 契约注释是否需要更新
2. 修改模块后，检查该模块的 L2 CLAUDE.md 成员清单
3. 影响架构时，更新本文件（L1）
