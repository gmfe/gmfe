import React, { Component, createRef } from 'react'
import classNames from 'classnames'
import { xor, flatMap, isNil, noop } from 'lodash'
import { BaseListDataOptions, BaseListProps } from './types'

class Base<V> extends Component<BaseListProps<V>> {
  static defaultProps = {
    onSelect: noop,
    renderItem: (value: BaseListDataOptions<any>) => value.text,
    getItemProps: () => ({}),
  }

  private _listRef = createRef<HTMLDivElement>()
  private _isUnMounted = false

  componentDidMount() {
    if (this.props.isScrollTo) {
      this._doScrollToSelected('.active')
      this._doScrollToSelected('.will-active')
    }
  }

  componentWillUnmount() {
    this._isUnMounted = true
  }

  componentDidUpdate() {
    if (this.props.isScrollTo) {
      this._doScrollToSelected('.will-active')
    }
  }

  public apiDoSelectWillActive = (): void => {
    const flatList = this._getFlatData()
    const { willActiveIndex } = this.props
    if (!isNil(willActiveIndex) && willActiveIndex < flatList.length) {
      this._handleSelect(flatList[willActiveIndex])
    }
  }

  private _getFlatData = () => {
    return flatMap(this.props.data, (v) => v.children)
  }

  private _doScrollToSelected = (selector: string): void => {
    // 找到第一个即可
    if (!this._isUnMounted) {
      const $active = this._listRef.current!.querySelector(selector)
      if ($active) {
        $active.scrollIntoView(true)
      }
    }
  }

  private _handleSelect = (value: BaseListDataOptions<V>): void => {
    if (value.disabled) {
      return
    }
    const { multiple, selected, onSelect } = this.props
    if (multiple) {
      onSelect && onSelect(xor(selected, [value.value]))
    } else {
      onSelect && onSelect([value.value])
    }
  }

  render() {
    const {
      data,
      isGroupList,
      selected,
      multiple,
      onSelect,
      isScrollTo,
      renderItem,
      className,
      willActiveIndex,
      getItemProps,
      ...rest
    } = this.props

    let sequenceDataIndex = -1
    return (
      <div
        {...rest}
        ref={this._listRef}
        className={classNames('gm-list', { 'gm-list-group': isGroupList }, className)}
      >
        {data.map((group, gIndex) => (
          <div key={gIndex + (group.label as string)} className='gm-list-group-item'>
            <div className='gm-list-label'>{group.label}</div>
            {group.children.map((value, index) => {
              sequenceDataIndex++
              return (
                <div
                  key={`${index}_${value.value}`}
                  {...getItemProps!(value)}
                  className={classNames('gm-list-item', {
                    active: selected.includes(value.value),
                    'will-active': willActiveIndex === sequenceDataIndex,
                    disabled: value.disabled,
                  })}
                  onClick={() => this._handleSelect(value)}
                >
                  {renderItem!(value, index)}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
}
export default Base
