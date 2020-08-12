import React, { CSSProperties, PropsWithChildren } from 'react'
import classNames from 'classnames'
import { CascaderDataOptionsWithPath } from './types'
import { Flex } from '../flex'

interface OverlayProps<T> {
  className?: string
  style?: CSSProperties
  selected: T[]
  list: CascaderDataOptionsWithPath<T>[][]
  filterLastResultID: T
  onSelect(): void
  onMouseEnter(_path: T[]): void
}

const Overlay = <T,>({
  className,
  style,
  selected,
  list,
  filterLastResultID,
  onSelect,
  onMouseEnter,
}: PropsWithChildren<OverlayProps<T>>) => {
  return (
    <Flex className={classNames('gm-cascader-list gm-bg', className)} style={style}>
      {list.map((value, index) => (
        <Flex
          column
          key={index}
          className={classNames('list-group gm-block gm-margin-0 gm-border-0 gm-overflow-y', {
            'gm-border-right': index !== list.length - 1,
          })}
        >
          {value.map((v) => (
            <Flex
              key={(v.value as any) as string}
              title={v.name}
              justifyBetween
              onClick={onSelect}
              onMouseEnter={() => onMouseEnter(v._path!)}
              className={classNames('list-group-item', {
                active: v.value === selected[index],
                hover: v.value === filterLastResultID,
              })}
              id={(v.value as any) as string}
            >
              {v.name}&nbsp;
              {!!v.children?.length && <i className={classNames('gm-arrow-right')} />}
            </Flex>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

export default Overlay
