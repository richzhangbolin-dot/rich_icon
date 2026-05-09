# CLAUDE.md — L2 store 模块

## 职责

数据持久化层。全部 localStorage 操作集中于此，对外提供 `useStore` hook。

## 成员清单

| 文件          | 职责                                |
|---------------|-------------------------------------|
| `storage.js`  | localStorage 原子读写（loadData / saveData） |
| `index.js`    | `useStore` hook，全局状态 + CRUD 操作 |

## 对外契约

```js
const {
  categories,     // Category[]
  icons,          // Icon[]
  addCategory,    // (name: string) => Category
  renameCategory, // (id, name) => void
  deleteCategory, // (id) => void  — 图标移入未分类
  addIcons,       // (items: {name,svg,categoryId}[]) => void
  deleteIcon,     // (id) => void
  moveIcon,       // (iconId, categoryId) => void
} = useStore();
```

## 变更协议

- 新增操作：在 `index.js` 添加，同步更新本文件"对外契约"节
- 存储键变更：同步更新 L1 CLAUDE.md 的"数据结构"节
