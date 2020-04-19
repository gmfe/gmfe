import { CSSProperties, FC, ReactNode } from 'react'

interface NavProps {
  logo?: ReactNode
  logoActive?: boolean
  data: NavDataOptions[]
  selected: string
  onSelect(selected: string): void
  showActive?: string
  other?: ReactNode
  className?: string
  style?: CSSProperties
}

interface NavDataOptions {
  link: string
  name: string
  icon: string
  style?: CSSProperties
  sub?: NavDataOptions[]
}

interface ItemProps {
  data: NavDataOptions
  selected: string
  onSelect(selected: string): void
  showActive?: string
}

interface NavFC extends FC<NavProps> {
  Item: FC<ItemProps>
}
declare const Nav: NavFC
export default Nav
export { NavDataOptions, NavProps, ItemProps as NavItemProps }
