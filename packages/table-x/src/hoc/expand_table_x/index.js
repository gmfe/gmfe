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
    ...rest
  }) => {
    const [expanded, setExpanded] = useState({})

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
          newExpanded[i] = {}
        })
        setExpanded(newExpanded)
      }
    }

    const renderSubComponent = row => {
      const isExpanded = !!expanded[row.index]
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
    SubComponent: PropTypes.func.isRequired
  }

  return ExpandTableX
}

export default expandTableXHOC
