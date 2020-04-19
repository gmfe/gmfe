import { CSSProperties, FC, ReactNode } from 'react'

interface NavData3RdOptions {
  link: string
  name: string
}

interface NavData1stOptions extends NavData3RdOptions {
  icon?: ReactNode
  sub?: NavData2RdOptions[]
}

interface NavData2RdOptions extends NavData3RdOptions {
  style?: CSSProperties
  sub: NavData3RdOptions[]
}

interface NavProps {
  logo?: ReactNode
  logoActive?: boolean
  /**
   * 三级菜单
   * 没有sub就没有浮层
   */
  data: NavData1stOptions[]
  /* pathname 会匹配到第三级的 link */
  selected: string
  /* 如果是选中一二级，会直接返回改分级下第三级的 item */
  onSelect(value?: NavData3RdOptions): void
  /* 控制 浮层的线上，如商品库传 merchandise */
  showActive?: string
  other?: ReactNode
  className?: string
  style?: CSSProperties
}

interface ItemProps {
  data: NavData1stOptions
  selected: string
  onSelect(data?: NavData1stOptions): void
  showActive?: string
}

type SingleItemData = Omit<NavData1stOptions, 'sub'>

interface SingleItemProps {
  data: SingleItemData
  selected: string
  onSelect(data: SingleItemData): void
}

interface NavFC extends FC<NavProps> {
  Item: FC<ItemProps>
  SingleItem: FC<SingleItemProps>
}

export type {
  NavProps,
  NavData1stOptions,
  NavData2RdOptions,
  NavData3RdOptions,
  ItemProps,
  SingleItemProps,
  NavFC,
}
