import React, { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import classNames from 'classnames'
import Left from './left'
import Page from './page'
import Right from './right'
import PagePeek from './page_peek'
import { PaginationConfigContext } from './config_context'
import { defaultLimitData } from './left'
import Storage from '../storage'

const resolvePersistLimit = (props, config) => {
  if (props.persistLimit != null) return !!props.persistLimit
  if (config && config.persistLimit != null) return !!config.persistLimit
  return true
}

/**
 * Storage key 与 ManagePagination 对齐：manage_pagination_<id>
 * 受控 Pagination 无 id 时用 Provider.limitScope（如 pathname）→ manage_pagination_scope_<scope>
 */
const resolveStorageId = (props, config) => {
  if (props.id) return String(props.id)
  if (config && config.limitScope) return 'scope_' + config.limitScope
  return null
}

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
 *
 * persistLimit !== false 且有 id / limitScope 时：
 * - 改条数写入 Storage
 * - 展示优先用 Storage 中的 limit（业务搜索写死 10 时分页栏不回退）
 * - data.limit 与记忆不一致时回写一次 onChange，驱动受控页用正确 limit 拉数
 */
const PaginationBase = props => {
  const config = useContext(PaginationConfigContext)

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

  const persistLimit = resolvePersistLimit(props, config)
  const storageId = resolveStorageId(props, config)
  const storedLimit =
    persistLimit && storageId
      ? Storage.get('manage_pagination_' + storageId)
      : null
  const storedLimitNum =
    storedLimit != null && Number(storedLimit) > 0 ? Number(storedLimit) : null
  const resolvedLimit =
    storedLimitNum != null ? storedLimitNum : props.data.limit
  const resolvedData =
    resolvedLimit === props.data.limit
      ? props.data
      : { ...props.data, limit: resolvedLimit }

  const onChangeRef = useRef(props.onChange)
  onChangeRef.current = props.onChange
  const syncedRef = useRef('')

  useEffect(() => {
    if (!persistLimit || !storageId || storedLimitNum == null) return
    if (storedLimitNum === props.data.limit) return
    const key = `${storageId}:${props.data.limit}->${storedLimitNum}`
    if (syncedRef.current === key) return
    syncedRef.current = key
    onChangeRef.current({
      ...props.data,
      offset: 0,
      limit: storedLimitNum
    })
  }, [
    persistLimit,
    storageId,
    storedLimitNum,
    props.data.limit,
    props.data.offset
  ])

  const handleChange = next => {
    if (persistLimit && storageId && next && next.limit != null) {
      Storage.set('manage_pagination_' + storageId, next.limit)
      if (next.limit !== props.data.limit) {
        syncedRef.current = ''
      }
    }
    if (
      next &&
      next.limit !== resolvedLimit &&
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
      data={resolvedData}
      limitData={limitData}
      onChange={handleChange}
    />
  )
}

PaginationBase.propTypes = {
  ...PaginationBaseInner.propTypes,
  /** 与 ManagePagination 相同：用于 Storage 记忆每页条数 */
  id: PropTypes.string,
  persistLimit: PropTypes.bool
}

export default PaginationBase
