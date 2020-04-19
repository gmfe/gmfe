import React, { FC } from 'react'
import { PaginationBaseProps } from './utils/types'
import PaginationBase from './pagination_base'

type PaginationV2Props = PaginationBaseProps

const PaginationV2: FC<PaginationV2Props> = (props) => {
  return <PaginationBase {...props} />
}

PaginationV2.displayName = 'PaginationV2'

export default PaginationV2
