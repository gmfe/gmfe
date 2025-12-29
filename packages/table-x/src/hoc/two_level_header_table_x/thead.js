import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import Th from '../../base/th'
import { getColumnStyle, SortHeader } from '../../util'

/**
 * 二级表头组件
 * 渲染两级表头：
 * - 第一行：一级表头（有子列的显示一级表头，没有子列的占两行）
 * - 第二行：二级表头（只有有子列的一级表头才显示）
 */
const TwoLevelTHead = ({ headerGroups, firstLevelHeaders, totalWidth }) => {
  const hasNestedHeaders = headerGroups.length > 1
  const firstLevelGroup = hasNestedHeaders ? headerGroups[0] : null
  const secondLevelGroup = hasNestedHeaders ? headerGroups[1] : headerGroups[0]

  // 构建第一级表头的渲染信息
  const firstLevelCells = []
  let secondLevelIndex = 0 // 在第二级表头中的索引

  firstLevelHeaders.forEach((firstLevelHeader, idx) => {
    if (firstLevelHeader.hasSubColumns) {
      // 有子列：从第二级表头中获取对应的列
      const subColumnCount = firstLevelHeader.subColumnCount
      const subColumns = secondLevelGroup.headers.slice(
        secondLevelIndex,
        secondLevelIndex + subColumnCount
      )

      // 获取对应的第一级分组列对象
      const groupColumn = firstLevelGroup
        ? firstLevelGroup.headers.find(col => {
            // 通过 id 或 Header 匹配
            return (
              col.id === firstLevelHeader.id ||
              (col.columns && col.columns.length === subColumnCount)
            )
          }) || firstLevelGroup.headers[idx]
        : null

      // 计算分组列的总宽度（所有子列的宽度之和）
      let totalSubWidth = 0
      subColumns.forEach(subCol => {
        const style = getColumnStyle(subCol)
        const width = parseFloat(style.width) || subCol.totalWidth || 0
        totalSubWidth += width
      })

      firstLevelCells.push({
        type: 'group',
        header: firstLevelHeader,
        colSpan: subColumnCount,
        subColumns: subColumns,
        totalWidth: totalSubWidth, // 添加总宽度
        column: groupColumn,
        secondLevelStartIndex: secondLevelIndex
      })

      secondLevelIndex += subColumnCount
    } else {
      let singleColumn = null

      // 优先从 firstLevelGroup 中查找单列（用于 getHeaderProps 等）
      if (firstLevelGroup) {
        singleColumn = firstLevelGroup.headers.find(col => {
          // 通过 id 或 accessor 匹配
          const matchId = col.id === firstLevelHeader.id
          const matchAccessor =
            col.accessor === firstLevelHeader.accessor ||
            (typeof col.accessor === 'function' &&
              typeof firstLevelHeader.accessor === 'function' &&
              col.accessor.toString() === firstLevelHeader.accessor.toString())
          return matchId || matchAccessor
        })
      }

      // 如果 firstLevelGroup 中没找到，从 secondLevelGroup 获取
      if (!singleColumn) {
        singleColumn = secondLevelGroup.headers[secondLevelIndex]
      }
      firstLevelCells.push({
        type: 'single',
        header: firstLevelHeader,
        colSpan: 1,
        rowSpan: 2, // 明确设置为 2，占两行
        column: singleColumn,
        secondLevelIndex: secondLevelIndex
      })

      secondLevelIndex += 1
    }
  })

  return (
    <thead className='gm-table-x-thead gm-table-x-thead-two-level'>
      {/* 第一级表头行 */}
      <tr className='gm-table-x-tr gm-table-x-tr-first-level'>
        {firstLevelCells.map((cell, idx) => {
          const { column, header, colSpan, rowSpan, type } = cell

          // 对于分组列，使用分组列对象；对于单列，使用单列对象
          const headerColumn = column
          const hp = headerColumn ? headerColumn.getHeaderProps() : {}
          const { thClassName, style } = headerColumn || {}

          // 计算样式
          let cellStyle = {
            ...hp.style,
            ...style
          }

          const fixed =
            type === 'group'
              ? header.fixed // 分组列直接使用 header.fixed，不 fallback 到 headerColumn
              : headerColumn?.fixed !== undefined
              ? headerColumn.fixed
              : header.fixed

          // 判断是否是最后一列（通过检查是否是 firstLevelCells 的最后一个元素）
          const isLastCell = idx === firstLevelCells.length - 1

          if (type === 'group') {
            const { flex, width, minWidth, maxWidth, ...restStyle } = cellStyle
            cellStyle = restStyle
          } else if (headerColumn) {
            const columnStyle = getColumnStyle(headerColumn)
            const { flex, ...restColumnStyle } = columnStyle
            cellStyle = {
              ...cellStyle,
              ...restColumnStyle // 只使用 width 和 maxWidth，不使用 flex
            }

            // 如果有固定列，确保宽度不被压缩
            if (fixed === 'left' || fixed === 'right') {
              const width = restColumnStyle.width
              if (width) {
                cellStyle.minWidth = width
              }
            }
          }
          if (fixed === 'left') {
            if (
              type === 'group' &&
              cell.subColumns &&
              cell.subColumns.length > 0
            ) {
              cellStyle.left = cell.subColumns[0].totalLeft
            } else if (headerColumn) {
              cellStyle.left = headerColumn.totalLeft
            }
          } else if (fixed === 'right') {
            // 对于分组列，使用最后一个子列的位置
            if (
              type === 'group' &&
              cell.subColumns &&
              cell.subColumns.length > 0
            ) {
              const lastSubCol = cell.subColumns[cell.subColumns.length - 1]
              // 如果是最后一列，直接设置 right: 0
              if (isLastCell) {
                cellStyle.right = 0
              } else {
                cellStyle.right =
                  totalWidth - lastSubCol.totalLeft - lastSubCol.totalWidth
              }
            } else if (headerColumn) {
              // 如果是最后一列，直接设置 right: 0
              if (isLastCell) {
                cellStyle.right = 0
              } else {
                cellStyle.right =
                  totalWidth - headerColumn.totalLeft - headerColumn.totalWidth
              }
            }
          }
          const {
            colSpan: hpColSpan,
            rowSpan: hpRowSpan,
            key: hpKey,
            ...restHp
          } = hp || {}
          const finalRowSpan =
            rowSpan !== undefined ? Number(rowSpan) : undefined
          const finalColSpan =
            colSpan !== undefined
              ? Number(colSpan)
              : hpColSpan !== undefined
              ? Number(hpColSpan)
              : undefined

          const thProps = {
            ...restHp,
            ...(finalColSpan !== undefined && { colSpan: finalColSpan }),
            ...(finalRowSpan !== undefined && { rowSpan: finalRowSpan }), // 只有定义了才添加
            className: classNames(
              'gm-table-x-th',
              'gm-table-x-th-first-level',
              hp?.className,
              thClassName,
              {
                'gm-table-x-fixed-left': fixed === 'left',
                'gm-table-x-fixed-right': fixed === 'right'
              }
            ),
            style: cellStyle
          }

          // 生成唯一的 key：结合 id/accessor 和索引，确保即使 id/accessor 相同，key 也是唯一的
          // 如果有 hpKey，也加上索引以确保唯一性（因为 hpKey 可能也会重复）
          const baseKey = hpKey || header.id || header.accessor
          const headerKey = baseKey ? `${baseKey}-${idx}` : `header-${idx}`
          return (
            <th key={headerKey} {...thProps}>
              {typeof header.Header === 'function' ? (
                <header.Header />
              ) : (
                header.Header
              )}
              {headerColumn?.canSort && (
                <SortHeader
                  {...headerColumn.getSortByToggleProps()}
                  type={
                    headerColumn.isSorted
                      ? headerColumn.isSortedDesc
                        ? 'desc'
                        : 'asc'
                      : null
                  }
                />
              )}
            </th>
          )
        })}
      </tr>

      {/* 第二级表头行（只有有子列的情况才显示） */}
      {hasNestedHeaders && secondLevelGroup && (
        <tr className='gm-table-x-tr gm-table-x-tr-second-level'>
          {secondLevelGroup.headers.map((column, idx) => {
            // 找到这个列对应的第一级表头
            const correspondingFirstLevel = firstLevelCells.find(cell => {
              if (cell.type === 'single') {
                return cell.secondLevelIndex === idx
              } else if (cell.type === 'group') {
                return (
                  idx >= cell.secondLevelStartIndex &&
                  idx < cell.secondLevelStartIndex + cell.colSpan
                )
              }
              return false
            })

            if (
              correspondingFirstLevel &&
              correspondingFirstLevel.type === 'single'
            ) {
              return null
            }
            // 生成唯一的 key：结合 id/accessor 和索引，确保即使 id/accessor 相同，key 也是唯一的
            const columnKey = column.id
              ? `${column.id}-${idx}`
              : column.accessor
              ? `${column.accessor}-${idx}`
              : `col-${idx}`
            return (
              <Th
                key={columnKey}
                column={{
                  ...column,
                  // column.fixed 已经在 transformColumnsForTwoLevel 中正确设置
                  thClassName: classNames(
                    column.thClassName,
                    'gm-table-x-th-second-level'
                  )
                }}
                totalWidth={totalWidth}
              />
            )
          })}
        </tr>
      )}
    </thead>
  )
}

TwoLevelTHead.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  firstLevelHeaders: PropTypes.array.isRequired,
  totalWidth: PropTypes.number.isRequired
}

export default React.memo(TwoLevelTHead)
