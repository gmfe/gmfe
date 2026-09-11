import React from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import classNames from 'classnames'
import Left from './left'
import Page from './page'
import Right from './right'
import PagePeek from './page_peek'
import { PaginationConfigContext } from './config_context'
import { defaultLimitData } from './left'

const PaginationBaseInner = props => {
  const {
    data,
    onChange,
    showCount,
    _peekInfo,
    className,
    limitData,
    ...rest
  } = props

  return (
    <Flex
      {...rest}
      alignCenter
      className={classNames('gm-pagination', className)}
    >
      <Left
        data={data}
        limitData={limitData}
        onChange={onChange}
        showCount={showCount}
      />
      {_peekInfo ? (
        <PagePeek data={data} _peekInfo={_peekInfo} onChange={onChange} />
      ) : (
        <Page data={data} onChange={onChange} />
      )}
      {showCount && <Right data={data} onChange={onChange} />}
    </Flex>
  )
}

PaginationBaseInner.propTypes = {
  data: PropTypes.shape({
    count: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired
  }),
  onChange: PropTypes.func.isRequired,
  showCount: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  _peekInfo: PropTypes.shape({
    more: PropTypes.bool,
    peek: PropTypes.number
  }),
  limitData: PropTypes.array
}

/**
 * 在 Base 层消费 Provider，保证 Pagination / PaginationV2 / ManagePagination
 * 都能拿到 page_size_options，避免 Left 单独 useContext 时出现双 Context 实例读不到配置。
 */
const PaginationBase = props => {
  return (
    <PaginationConfigContext.Consumer>
      {config => {
        let limitData = props.limitData
        if (
          limitData == null &&
          config &&
          Array.isArray(config.limitData) &&
          config.limitData.length
        ) {
          limitData = config.limitData
        }
        if (limitData == null) {
          limitData = defaultLimitData
        }

        const handleChange = next => {
          if (
            next &&
            next.limit !== props.data.limit &&
            config &&
            config.onLimitChange
          ) {
            config.onLimitChange(next.limit)
          }
          props.onChange(next)
        }

        return (
          <PaginationBaseInner
            {...props}
            limitData={limitData}
            onChange={handleChange}
          />
        )
      }}
    </PaginationConfigContext.Consumer>
  )
}

PaginationBase.propTypes = PaginationBaseInner.propTypes

export default PaginationBase
