import React, { ComponentType, FC } from 'react'
import { TableXProps } from '../types'

function fixedColumnsTableXHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  const FixedColumnsTableX: FC<Props> = (props) => <Table {...(props as Props)} />
  return FixedColumnsTableX
}

export default fixedColumnsTableXHOC
