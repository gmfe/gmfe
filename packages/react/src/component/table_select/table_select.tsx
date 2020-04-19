import React, { forwardRef, PropsWithChildren, ReactNode, Ref, useCallback, useMemo } from 'react'
import { devWarnForHook } from '@gm-common/tool'
import classNames from 'classnames'
import _ from 'lodash'
import { MoreSelect, MoreSelectGroupDataOptions, MoreSelectNormalDataOptions } from '../more_select'
import { TableSelectProps } from './types'
import { Flex } from '../flex'
import getColumnKey from './get_column_key'

const TableSelect = forwardRef(
  <V,>(props: PropsWithChildren<TableSelectProps<V>>, ref: Ref<MoreSelect<V>>) => {
    const { data, columns, className, ...rest } = props
    devWarnForHook(() => {
      columns.forEach((column, index) => {
        if (!column.width) {
          console.warn('column need width', column, index)
        }
      })
    })

    devWarnForHook(() => {
      console.warn(
        '目前 columns 的泛型存在无法修复的问题，临时解决办法为暂时不设置泛型类型，并手动设置 Cell 的类型'
      )
    })

    const Title = useMemo(
      () => (
        <Flex alignCenter justifyCenter style={{ minHeight: '40px' }}>
          {columns.map((column, index) => (
            <div
              key={`${index}_${getColumnKey(column)}`}
              className={classNames('gm-flex-flex', { 'gm-flex-none': column.width })}
              style={{ width: `${column.width}px` }}
            >
              {column.Header}
            </div>
          ))}
        </Flex>
      ),
      [columns]
    )

    const newData: MoreSelectGroupDataOptions<V>[] = data.length
      ? [{ label: Title, children: data }]
      : []

    const renderListItem = useCallback(
      (item: MoreSelectNormalDataOptions<V>, index: number) => {
        return (
          <Flex
            key={`${index}-${item.value}`}
            alignCenter
            justifyCenter
            style={{ minHeight: '40px', position: 'relative' }}
          >
            {columns.map((column, i) => {
              let content: ReactNode
              if (column.Cell) {
                content = column.Cell({ original: item, index })
              } else if (_.isFunction(column.accessor)) {
                content = column.accessor(item)
              } else if (_.isString(column.accessor)) {
                content = _.get(item, column.accessor)
              } else {
                content = <div className='gm-text-desc'>-</div>
              }
              return (
                <div
                  key={`${i}_${getColumnKey(column)}`}
                  className={classNames('gm-flex-flex', { 'gm-flex-none': column.width })}
                  style={{ width: `${column.width}px` }}
                >
                  {content}
                </div>
              )
            })}
          </Flex>
        )
      },
      [columns]
    )

    return (
      <MoreSelect
        ref={ref}
        {...rest}
        isGroupList
        renderListItem={renderListItem}
        data={newData}
        className={classNames('gm-table-select', className)}
        popupClassName='gm-table-select-popup'
      />
    )
  }
)

TableSelect.displayName = 'TableSelect'

export default TableSelect
