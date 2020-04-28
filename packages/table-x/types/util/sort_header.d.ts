import { CSSProperties, FC, MouseEvent } from 'react'

type SortHeaderType = 'asc' | 'desc'

interface SortHeaderProps {
  type?: SortHeaderType
  onClick?(event: MouseEvent<HTMLSpanElement>): void
  onChange?(type: SortHeaderType): void
  className?: string
  style?: CSSProperties
}
declare const SortHeader: FC<SortHeaderProps>
export default SortHeader
