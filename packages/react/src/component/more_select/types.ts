import { CSSProperties, ReactNode, KeyboardEvent } from 'react'

/* 普通的数据格式 */
interface MoreSelectNormalDataOptions<T> {
  value: T
  text: string
  disabled?: boolean
  [key: string]: any
}

/* 分组的数据格式 */
interface MoreSelectGroupDataOptions<T> {
  label: ReactNode
  children: MoreSelectNormalDataOptions<T>[]
}

type MoreSelectDataOptions<T> =
  | MoreSelectNormalDataOptions<T>
  | MoreSelectGroupDataOptions<T>

/* 换个皮给 MoreSelectBase 用 */
type MoreSelectBaseDataOptions<T> = MoreSelectGroupDataOptions<T>

interface MoreSelectCommonProps<T> {
  multiple?: boolean
  disabled?: boolean
  /* 单选禁止显示关闭按钮 */
  disabledClose?: boolean
  /* 搜索回调 */
  onSearch?(
    searchWord: string,
    data: MoreSelectBaseDataOptions<T>[]
  ): Promise<void> | void
  delay?: number
  searchPlaceholder?: string
  /* 自定义搜索过滤展示的数据 */
  renderListFilter?(
    data: MoreSelectBaseDataOptions<T>[],
    searchValue: string
  ): MoreSelectBaseDataOptions<T>[]
  /* 过滤方式 */
  renderListFilterType?: 'default' | 'pinyin'
  placeholder?: string
  /* 自定义渲染已选择项 */
  renderSelected?(selected: MoreSelectNormalDataOptions<T>): ReactNode
  /* 自定义渲染列表项 */
  renderListItem?(value: MoreSelectNormalDataOptions<T>, index: number): ReactNode
  listHeight?: string
  isGroupList?: boolean
  popoverType?: 'focus' | 'realFocus'
  className?: string
  style?: CSSProperties
  popupClassName?: string
  isInPopup?: boolean
  isKeyboard?: boolean
  onKeyDown?(event: KeyboardEvent): void
}

interface MoreSelectBaseProps<T> extends MoreSelectCommonProps<T> {
  data: MoreSelectBaseDataOptions<T>[]
  selected: MoreSelectNormalDataOptions<T>[]
  onSelect(selected: MoreSelectNormalDataOptions<T>[]): void
}

interface MoreSelectProps<T> extends MoreSelectCommonProps<T> {
  data: MoreSelectDataOptions<T>[]
  selected: MoreSelectNormalDataOptions<T> | MoreSelectNormalDataOptions<T>[] | null
  onSelect(
    selected: MoreSelectNormalDataOptions<T> | MoreSelectNormalDataOptions<T>[]
  ): void
}

export type {
  MoreSelectBaseDataOptions,
  MoreSelectGroupDataOptions,
  MoreSelectNormalDataOptions,
  MoreSelectDataOptions,
  MoreSelectBaseProps,
  MoreSelectCommonProps,
  MoreSelectProps,
}
