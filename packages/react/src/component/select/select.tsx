import React, { Component, createRef, KeyboardEvent } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { SelectDataOptions, SelectProps } from './types'
import { Popover } from '../popover'
import { Selection } from '../selection'
import { List } from '../list'

interface SelectState {
  willActiveIndex: number
}

class Select<V> extends Component<SelectProps<V>, SelectState> {
  static defaultProps = {
    canShowClose: false,
    onKeyDown: _.noop,
    popoverType: 'focus',
  }

  readonly state: SelectState = {
    willActiveIndex: 0,
  }

  private _popupRef = createRef<Popover>()
  private _selectionRef = createRef<Selection<SelectDataOptions<V>>>()

  public apiDoFocus = (): void => {
    this._selectionRef.current!.apiDoFocus()
  }

  public apiDoSelectWillActive = (): void => {
    const { data, onChange } = this.props
    const { willActiveIndex } = this.state
    if (data[willActiveIndex]) {
      onChange(data[willActiveIndex].value)
    }
  }

  private _handleChange = (selected: V): void => {
    const { onChange } = this.props
    this._popupRef.current!.apiDoSetActive()
    onChange(selected)
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    const { data, onKeyDown } = this.props
    let { willActiveIndex } = this.state
    if (!onKeyDown) {
      return
    }
    if (!(event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      onKeyDown(event)
      return
    }
    // 没有数据，不用拦截
    if (data.length === 0) {
      onKeyDown(event)
      return
    }
    // 以下是需要拦截部分
    event.preventDefault()
    if (event.key === 'ArrowUp') {
      willActiveIndex--
    } else if (event.key === 'ArrowDown') {
      willActiveIndex++
    }
    // 修正
    if (willActiveIndex < 0) {
      willActiveIndex = data.length - 1
    } else if (willActiveIndex > data.length - 1) {
      willActiveIndex = 0
    }
    this.setState({
      willActiveIndex,
    })
  }

  render() {
    const {
      data,
      value,
      onChange,
      children,
      disabled,
      listProps,
      canShowClose,
      clean,
      className,
      popoverType,
      isInPopup,
      ...rest
    } = this.props
    const { willActiveIndex } = this.state
    const selected = data.find((v) => v.value === value)
    const listStyle = listProps?.style ?? {}

    const popup = (
      <List
        {...listProps}
        data={data}
        selected={value}
        onSelect={this._handleChange}
        willActiveIndex={willActiveIndex}
        className='gm-border-0'
        style={{ maxHeight: '250px', ...listStyle }}
      />
    )
    return (
      <Popover
        ref={this._popupRef}
        type={popoverType}
        disabled={disabled}
        popup={popup}
        isInPopup={isInPopup}
      >
        <Selection
          ref={this._selectionRef}
          {...rest}
          selected={selected}
          onSelect={onChange}
          disabled={disabled}
          disabledClose={!canShowClose}
          clean={clean}
          className={classNames('gm-select', className)}
          isForSelect
          onKeyDown={this._handleKeyDown}
        />
      </Popover>
    )
  }
}
export default Select
