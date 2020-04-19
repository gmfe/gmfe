# 3.0.0

### breaking change

1. gmfe 所有还在维护的仓库代码主要编程语言切换为`TypeScript`，包含以下仓库：
   * business
   * cropper
   * keyboard
   * locales （仅编写声明文件）
   * react
   * sortable
   * table-x
   * tour
   
3. 静态创建 Modal 会自动带上 `Modal.hide`；

4. 移除 Modal 的静态方法：
    *   `Modal.confirm` 
    *   `Modal.info` 
    *   `Modal.success` 
    *   `Modal.warning` 
    
5. InputNumber 废弃，迁移到 `@gmfe/react-deprecated`;

6. InputNumberV2 的 `value` 由选传修改为必传；

7. Select 的子组件 Option 废弃，Select 不再兼容老用法；

8. ToolTip 更名为 Tooltip；

9. Sheet 废弃，迁移到 `@gmfe/react-deprecated`；

10. Dropper 废弃，迁移到 `@gmfe/react-deprecated`；

11. FilterSelect, MultipleFilter 废弃，迁移到 `@gmfe/react-deprecated`；

12. DropDown 系列组件更名：
    * DropDown 更名为 Dropdown;
    * DropDownItems 更名为 DropdownItems；
    * DropDownItem 更名为 DropdownItem
    
13. FormItem 的 `toolTip` 更名为 `tooltip`；

14. ImgUploader 的 `data` 类型规定为 `string[]`；

15. Transfer 废弃，迁移到 `@gmfe/react-deprecated`；

16. Tree 废弃，迁移到 `@gmfe/react-deprecated`；

17. TableSelect 的 `selected` 由选传修改为必传；

18. Pagination 组件修改：
     * Pagination 的 `data` 由选传修改为必传，并增加默认值 `{ offset: 0, limit:10 }`；
     * PaginationText 废弃，迁移到 `@gmfe/react-deprecated`
    
19. Cascader 组件修改：
     * Cascader 的 `filtrable` 更名为 `filterable`；
     * CascaderSelect 的 `filtrable` 更名为 `filterable`；
     * CascaderSelect 的 `onSelect` 不再返回 `null`
    
20. ManagePaginationV2 的老用法 `doFirstRequest` 和 `doCurrentRequest` 废弃；

21. Sortable 和 GroupSortable 的 `onChange` 由选传修改为必传；

22. `@gmfe/table` 废弃，请使用 `@gmfe/table-x`；

23. `@gmfe/table-x` 的 Th 内部实现的 SortHeader 废弃；

24. 由于 TypeScript 目前不支持带泛型参数的`React.memo` [[@type/react] Generic Props lost with React memo](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087) ，所以内部包裹了一层实现`typedMemo`；

25. 由于 TypeScript 不支持 react-table 中 `accessor` 中的嵌套定义，请使用以下方法替代：

     ```typescript
     import { Columns } from 'react-table'
     
     interface InitialDataOptions {
       address: {
         text: string
         value: number
       }
     }
     
     const columns: Columns<InitialDataOptions>[] = [
       {
         ...
         accessor: 'address.text' as any // 使用断言的方式绕过 TSC 对类型的校验
         // 或者
         // @ts-ignore
         accessor: 'address.text' // 禁用掉 TSC 对下一行代码的校验
       }
     ]
     ```

26.  在使用 DiyTableX 时，如果传入的 `accessor` 是一个 function，请提供唯一的 `id`；

26.  在使用 SelectTableX 的子组件 BatchActionBar 时，count 不再需要手动去除来切换当前页和全部页；

27.  全键盘 keyboardTableHOC 尽管已经完成迁移，但是不在迭代，请使用 keyboardTableXHOC 代替；

28.  由于 react-docgen-typescript-loader（用于生成 storybook 的 prop-types）这个插件会使用文件名来声明成变量名，所以文件名一律不能用 JavaScript 关键字、保留字等； 







# 2.9.0

### breaking change

废弃 @gmfe/business 的
configError
configProgress
configHeaders
configTrace
转 @gm*common/request

# 2.5.0

### breaking change

Button type 意义变动，即之前原生 type 改 htmlType
