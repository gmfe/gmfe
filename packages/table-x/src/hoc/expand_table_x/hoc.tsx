import React, { ComponentType, FC, ReactNode, useState } from 'react'
import { devWarnForHook } from '@gm-common/tool'
import _ from 'lodash'
import { Row } from 'react-table'
import { TableXProps } from '../../types'
import ExpandTableXContext from './context'
import useGetColumns from './use_get_columns'

export interface ExpandTableXProps<Original extends object> {
  fixedExpand?: boolean
  SubComponent(row: Row<Original>): ReactNode
  /* 传了 expanded，组件 expand 状态交给 props 控制，则必须同时传 onExpand */
  expanded?: { [key: number]: boolean }
  onExpand?(expanded: { [key: number]: boolean }): void
}

function expandTableXHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  const ExpandTableX: FC<Props & ExpandTableXProps<Original>> = (props) => {
    const isControlByProps = 'expanded' in props
    devWarnForHook(() => {
      if (isControlByProps) {
        if (!('onExpand' in props)) {
          console.error('If pass in `expanded`, please pass `onExpand`')
        }
      }
    })

    const {
      columns,
      data,
      SubComponent,
      fixedExpand,
      expanded: expandedFromProps,
      onExpand,
      ...rest
    } = props

    const [expanded, setExpanded] = isControlByProps
      ? [expandedFromProps!, onExpand!]
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useState<{ [key: number]: boolean }>({})
    const isExpandAll = _.filter(expanded, (v) => v).length === data.length

    const handleExpand = (expanded: { [key: number]: boolean }): void => {
      setExpanded(expanded)
    }

    const handleExpandAll = (): void => {
      if (isExpandAll) {
        setExpanded({})
      } else {
        const newExpanded: { [key: number]: boolean } = {}
        data.forEach((_, index) => {
          newExpanded[index] = true
        })
        setExpanded(newExpanded)
      }
    }

    const renderSubComponent = (row: Row<Original>) => {
      const isExpanded = expanded[row.index]
      if (!isExpanded) {
        return null
      }
      return SubComponent(row)
    }

    const newColumns = useGetColumns<Original>(columns, !!fixedExpand)

    return (
      <ExpandTableXContext.Provider
        value={{ expanded, isExpandAll, onExpand: handleExpand, onExpandAll: handleExpandAll }}
      >
        <Table
          {...(rest as Props)}
          data={data}
          columns={newColumns}
          SubComponent={renderSubComponent}
        />
      </ExpandTableXContext.Provider>
    )
  }

  return ExpandTableX
}

export default expandTableXHOC
