# 3.0.0

### breaking change

1. gmfe 所有在维护的仓库代码主要编程语言切换为`TypeScript`，包含以下仓库：
   - business
   - cropper
   - keyboard
   - locales
   - react
   - sortable
   - table
   - table-x
   - tour
2. 静态创建 Modal 会自动带上 `Modal.hide`；
3. InputNumberV2 `value` 由选传修改为必传；

# 2.9.0

### breaking change

废弃 @gmfe/business 的
configError
configProgress
configHeaders
configTrace
转 @gm-common/request

# 2.5.0

### breaking change

Button type 意义变动，即之前原生 type 改 htmlType
