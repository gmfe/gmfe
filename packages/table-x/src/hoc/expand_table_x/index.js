import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TableX from '../../base'
import _ from 'lodash'
import { TABLE_X, TABLE_X_EXPAND_ID } from '../../util'
import { Expand, ExpandContext } from './util'

const ExpandHeader = React.memo(() => {
  return (
    <ExpandContext.Consumer>
      {({ isExpandAll, onExpandAll }) => (
        <Expand active={isExpandAll} onChange={onExpandAll} />
      )}
    </ExpandContext.Consumer>
  )
})

const ExpandCell = React.memo(({ row }) => {
  return (
    <ExpandContext.Consumer>
      {({ expanded, onExpand }) => {
        const isExpanded = !!expanded[row.index]

        return (
          <Expand
            active={isExpanded}
            onChange={() => {
              onExpand({
                ...expanded,
                [row.index]: !isExpanded
              })
            }}
          />
        )
      }}
    </ExpandContext.Consumer>
  )
})

ExpandCell.propTypes = {
  row: PropTypes.object.isRequired
}

function getNewColumns(columns, fixedExpand) {
  return [
    {
      id: TABLE_X_EXPAND_ID,
      width: TABLE_X.WIDTH_FUN,
      maxWidth: TABLE_X.WIDTH_FUN,
      fixed: fixedExpand ? 'left' : null,
      thClassName: 'gm-table-x-icon',
      tdClassName: 'gm-table-x-icon',
      Header: () => <ExpandHeader />,
      // eslint-disable-next-line
      Cell: ({ row }) => <ExpandCell row={row} />
    }
  ].concat(columns)
}

function expandTableXHOC(Component) {
  const ExpandTableX = ({
    columns,
    data,
    SubComponent,
    fixedExpand,
    expanded: expandedFromProps,
    onExpand,
    ...rest
  }) => {
    // expanded状态是否由调用方控制
    const isControlByProps = expandedFromProps !== undefined

    const [expanded, setExpanded] = isControlByProps
      ? [expandedFromProps, onExpand]
      : useState({})

    const isExpandAll = _.filter(expanded, v => v).length === data.length

    const handleExpand = expanded => {
      setExpanded(expanded)
    }

    const handleExpandAll = () => {
      if (isExpandAll) {
        setExpanded({})
      } else {
        const newExpanded = {}
        _.each(data, (v, i) => {
          newExpanded[i] = true
        })
        setExpanded(newExpanded)
      }
    }

    const renderSubComponent = row => {
      const isExpanded = expanded[row.index]
      if (!isExpanded) {
        return null
      }

      return SubComponent(row)
    }

    // columns 即可，其他都是死的。
    const newColumns = React.useMemo(() => {
      return getNewColumns(columns, fixedExpand)
    }, [columns])

    return (
      <ExpandContext.Provider
        value={{
          expanded,
          onExpand: handleExpand,
          isExpandAll,
          onExpandAll: handleExpandAll
        }}
      >
        <Component
          {...rest}
          columns={newColumns}
          data={data}
          SubComponent={renderSubComponent}
        />
      </ExpandContext.Provider>
    )
  }

  ExpandTableX.propTypes = {
    ...TableX.propTypes,
    fixedExpand: PropTypes.bool,
    SubComponent: PropTypes.func.isRequired,
    /** 传了expanded，组件expand交由外部props控制，则必须也要传onExpand。 */
    expanded: PropTypes.object,
    onExpand: PropTypes.func
  }

  return ExpandTableX
}

export default expandTableXHOC
