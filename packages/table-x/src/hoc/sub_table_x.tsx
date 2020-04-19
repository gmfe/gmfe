import React, { ComponentType, FC, useMemo } from 'react'
import classNames from 'classnames'
import { TABLE_X, TABLE_X_SUB_TABLE_ID } from '../utils'
import { TableXProps } from '../types'

export interface SubTableXProps {
  /* 默认功能区宽度 */
  subTableIndent?: number
}

function subTableXHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  const SubTableX: FC<Props & SubTableXProps> = ({
    columns,
    subTableIndent = TABLE_X.WIDTH_FUN,
    className,
    ...rest
  }) => {
    const _columns = useMemo(
      () => [
        {
          id: TABLE_X_SUB_TABLE_ID,
          width: subTableIndent,
          maxWidth: subTableIndent,
          Header: '',
        },
        ...columns,
      ],
      [columns, subTableIndent]
    )

    return (
      <Table
        {...(rest as Props)}
        columns={_columns}
        className={classNames('gm-table-x-sub-table', className)}
      />
    )
  }

  return SubTableX
}

export default subTableXHOC
