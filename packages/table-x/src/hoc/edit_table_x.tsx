import React, { ComponentType, FC } from 'react'
import classNames from 'classnames'
import { TableXProps } from '../types'

function editTableXHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  const EditTableX: FC<Props> = ({ className, ...rest }) => (
    <Table {...(rest as Props)} className={classNames('gm-table-x-edit-table', className)} />
  )
  return EditTableX
}

export default editTableXHOC
