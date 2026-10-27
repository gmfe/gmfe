# feature/1056482 合并 release/v1.17.0 逻辑冲突记录

> **合并方式**：`git merge --squash`（压缩 9 个提交，结果保留在暂存区，未提交）
> **ours**：release/v1.17.0（bbb1325，含 v2.14.43 发版 bump）
> **theirs**：feature/1056482（ac81b71，9 个提交：BoxTable/DIY/Popover/分页/table-x 性能优化等）
> **merge-base**：8e74677（chore: v2.14.42）
> **总原则**：保留双方功能。本次合并范围 58 文件（+1427 / -440）。

## 决策速查表

| 项 | 文件 | 结论 | 需确认方 |
|----|------|------|----------|
| lerna.json 版本号 | `lerna.json` | 取 ours 的 `2.14.43`（theirs 版本号未动，仅补末尾换行，换行一并保留） | 无需（ours 单方 bump，可推定） |
| 双方 table-x 勾选性能优化 | `packages/table-x/src/**`（5 文件） | **同一补丁双分支提交**（patch-id 全等 `df7a24f6…`），幂等收敛，无叠加冲突 | ✅ 已由双 agent 独立验证（patch-id + blob 三方全等） |
| Popover 空弹层修复 | `packages/react/src/component/popover/index.js` | **同一补丁双分支提交**（patch-id 全等 `75b59e3f…`），幂等收敛 | ✅ 已由双 agent 独立验证 |

> 本次合并**无高风险（钱/接口/不兼容签名）决策**。唯一 marker 冲突为版本号；6 个共同改动文件经审查全部为幂等合并。

## 逐文件记录

### lerna.json（唯一 marker 冲突）

- **双方各做了什么**：ours 将 `version` 从 `2.14.42` bump 到 `2.14.43`（发版）；theirs 版本号保持 `2.14.42`，仅删除文件末尾的 `\ No newline at end of file`（补换行）。
- **处理**：版本号取 ours `2.14.43`，末尾换行取 theirs。
- **依据**：theirs 对版本号零改动（`git diff 8e74677..ac81b71 -- lerna.json` 仅末尾换行差异），ours 是唯一实质 bump 侧——非重叠意图，各取所长。换行符属纯格式，取更规范的 POSIX 写法。
- **校验**：marker = 0；`JSON.parse` 通过，version = 2.14.43；文件以 `\n` 结尾。

### packages/table-x/src/base/index.js（自动合并，审查通过）

- **双方各做了什么**：ours 提交 `1cc2748` 与 theirs 提交 `9beafb8` 对该文件的补丁 patch-id 完全一致——同一作者同日先后提交到两个分支的同一份代码：新增 `tbodyRowsCacheRef` 行渲染缓存（失效键 = rows / SubComponent / totalWidth / keyField / isTrDisable / isTrHighlight 引用比较）+ dev 态原地修改 data 的采样告警。
- **合并核对**：ours == theirs == 合并结果，blob 逐字节全等，无重复定义、无 import 遗漏。

### packages/table-x/src/hoc/select_table_x/（4 文件，自动合并，审查通过）

- `cell.js`：`SelectCell` 改为 `React.memo` + 自定义比较器（仅比较 `row` 引用）；Consumer 拆分为 `SelectedSetContext` + `SelectOperationContext`。checkbox 的 `_.xor(Array.from(selectedSet), [value])` 与旧逻辑语义等价（Set 保插入序）。
- `header.js`：全选框取值路径与新 Provider 喂值结构（`selectedSetValue` / `operationValue`）严格对齐，无错配。
- `index.js`：Provider 改双层嵌套（外层传引用稳定 operationValue ref，内层 useMemo 化 selectedSetValue）；`latestRef` 快照机制防全选反转的过期闭包。全选/取消全选语义与旧版等价。
- `util.js`：单一 `SelectContext` 拆分为两个 Context；全仓库 grep 旧名 `SelectContext` 0 处残留，3 个消费点全部正确切换。
- **依据**：patch-id 全等 + blob 三方全等（cell.js `fc9a054a`、util.js `be1bae29` 等），且双方各只有这一个提交触碰这些文件。

### packages/react/src/component/popover/index.js（自动合并，审查通过）

- **双方各做了什么**：theirs `22ce670`（Popover 空 popup 立即卸载弹层并禁用触发：新增 `isEmptyPopup`、`doRenderPopup` 空弹层即卸载、`getDisabled` 短路）此前已被重放到 ours 的 `1cc2748` 中，两侧内容逐字节相同。
- **合并核对**：`isEmptyPopup` 定义恰 1 次，4 处改动完整保留且仅一份。

## 回归建议（针对随版本进入 release 的性能优化）

该优化虽非合并引入（release 侧已有），但 squash 后首次进入 release 发版链路，回归时建议覆盖：

1. **data 必须整组替换**（新数组引用）：原地修改行字段（如 `store.data[i].status = 2`）时普通（非 observer）Cell 显示旧值；dev 态有采样 console.warn 防线，生产静默。
2. `isTrDisable` / `isTrHighlight` / `isSelectorDisable` 应引用稳定且仅依赖行数据派生，否则缓存 / memo 命中期间行禁用、高亮、勾选禁用态不刷新。
3. 勾选用例一套即可（两侧同一代码）：单选 / 多选 / 跨页累积全选 / 取消全选 / 禁用行勾选 / 批量操作条联动。

## 遗留项（均为 pre-existing，本次未改动）

| 项 | 位置 | 说明 |
|----|------|------|
| `process.env.NODE_ENV` 全仓库首例用法 | `packages/table-x/src/base/index.js:149、184` | 本次审查时 node_modules 为空、`gm-react-app` 私有插件不可得，仅能降级检查（无 parsing error）。需在装好依赖的环境跑真实 `npx eslint` 确认是否报 `no-undef`；若报，按同文件惯例补 `// eslint-disable-next-line` 即可。运行时无风险（webpack define 替换）。两侧代码相同，非合并引入 |
| 注释笔误 | `packages/table-x/src/hoc/select_table_x/util.js:6` | 注释称 `SelectOperationContext` 含 isSelectAll，实际在 `SelectedSetContext` 中。不影响行为，未改动 |
| lint 沙箱 warning 误报 | 各文件 | 降级 eslint 缺 react 插件导致 JSX 变量被判 unused，均为误报，项目真实配置不会报 |

## 校验方式

- marker 冲突文件：`grep -c '<<<<<<<\|>>>>>>>\|======='` = 0，`JSON.parse` 通过后 `git add`。
- 自动合并文件：无 marker（git 三方合并成功），双 agent 并行审查（patch-id / blob hash / 符号用量 / 旧符号残留 grep）+ 降级 eslint 无 parsing error。
- 全仓库 `git diff --diff-filter=U` 为空，58 文件全部位于暂存区，**未提交**（等待人工验收）。
