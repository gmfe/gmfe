import { FlexProps } from '../../flex/flex'

interface PaginationDataOptions {
  /* 起始位置 */
  offset: number
  /* 查询长度 */
  limit: number
  /* 查询总数 */
  count?: number
}

interface PaginationBaseProps extends Omit<FlexProps, 'onChange'> {
  /**
   * 非传统意义上的分页信息，仅此组件需要的数据而已。
   * count 仅当前有多少条数据，非传统意义上的一共有多少条数据。
   * 注意：是当前
   */
  data: Required<PaginationDataOptions>
  onChange(pagination: PaginationDataOptions): void
  /* 此 count 非 data.count。只是用来控制显不显示总数 */
  showCount?: boolean
  /**
   * @private
   * 私有
   */
  _peekInfo?: {
    more?: boolean
    peek?: number
  }
}

interface PaginationProps extends FlexProps {
  data: PaginationDataOptions
  toPage(pagination: PaginationDataOptions): void
  nextDisabled?: boolean
}

export type { PaginationDataOptions, PaginationBaseProps, PaginationProps }
