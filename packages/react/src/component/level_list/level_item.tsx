import React, {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  useCallback,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { LevelListDataOptions } from './types'
import SVGRightSmall from '../../../svg/right-small.svg'
import { List } from '../list'

interface LevelItemProps<V> {
  title?: string
  data: LevelListDataOptions<V>[]
  selected?: V
  onSelect?(selected: V): void
  onListItemMouseEnter?(value: LevelListDataOptions<V>): void
  willActiveSelected?: V
  className?: string
  style?: CSSProperties
}

function LevelItem<V>(props: LevelItemProps<V>): ReactElement {
  const {
    title,
    data,
    selected,
    onSelect,
    onListItemMouseEnter,
    willActiveSelected,
    className,
    style,
  } = props
  const renderItem = useCallback((item: LevelListDataOptions<V>) => {
    const hasChildren = item.children && !!item.children.length
    return (
      <div className='gm-position-relative'>
        <div className={classNames({ 'gm-margin-right-10': hasChildren })}>
          {item.text}
        </div>
        {hasChildren && <SVGRightSmall className='gm-level-list-item-right' />}
      </div>
    )
  }, [])

  const getItemProps = useCallback(
    (item: LevelListDataOptions<V>): HTMLAttributes<HTMLDivElement> => ({
      onMouseEnter: () => onListItemMouseEnter && onListItemMouseEnter(item),
    }),
    [onListItemMouseEnter]
  )

  const willActiveIndex = useMemo(
    () => data.findIndex((value) => value.value === willActiveSelected),
    [data, willActiveSelected]
  )

  return (
    <div className={classNames('gm-level-list-item', className)} style={style}>
      {title && <div className='gm-level-list-item-title'>{title}</div>}
      <List
        data={data}
        selected={selected}
        onSelect={onSelect}
        renderItem={renderItem}
        getItemProps={getItemProps}
        willActiveIndex={willActiveIndex}
      />
    </div>
  )
}

export default LevelItem
