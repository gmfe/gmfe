import React, { ChangeEvent, Component, KeyboardEvent, MouseEvent, ReactNode } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { CascaderProps, CascaderDataOptionsWithPath, CascaderDataOptions } from './types'
import { getMaxDeepPathOfMatchElement, mapPath } from './utils'
import { Popover } from '../popover'
import SVGCloseCircle from '../../../svg/close-circle.svg'
import SVGDownSmall from '../../../svg/down.svg'
import SVGUpSmall from '../../../svg/up.svg'
import Overlay from './overlay'

interface CascaderState<T> {
  selected: T[]
  /* props.filterable 为true时，输入框的内容 */
  filterInput: string | null
  data: CascaderDataOptionsWithPath<T>[]
  filterLastResultID: T | null
}

class Cascader<T> extends Component<CascaderProps<T>, CascaderState<T>> {
  static defaultProps = {
    value: [],
    valueRender: (value: CascaderDataOptions<any>[]) => value.map((v) => v.name).join(','),
  }

  readonly state: CascaderState<T> = {
    selected: this.props.value ? [...this.props.value] : [],
    filterInput: null,
    data: mapPath(this.props.data),
    filterLastResultID: null,
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Readonly<CascaderProps<T>>) {
    if ('value' in nextProps) {
      this.setState({ selected: nextProps.value ? [...nextProps.value] : [] })
    }
    if (nextProps.data !== this.props.data) {
      this.setState({ data: mapPath(nextProps.data) })
    }
  }

  private _getList = () => {
    const { selected } = this.state
    const result = [this.state.data]
    selected.forEach((value, index) => {
      const match = result[index].find((val) => val.value === value)
      if (match?.children) {
        result.push(match.children)
      }
    })
    return result
  }

  private _setHoverStatus = _.debounce((selected: T) => {
    this.setState({ filterLastResultID: selected })
  }, 500)

  private _handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const filterInput = event.target.value
    const { filterable } = this.props
    if (filterable) {
      const { data } = this.state
      const selected = getMaxDeepPathOfMatchElement(data, filterInput)
      this.setState({ selected, filterInput })
      this._setHoverStatus(selected.slice().reverse()[0])
    }
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    const { keyCode } = event
    // 键盘上下键控制最当前选中列
    if (keyCode === 38 || keyCode === 40) {
      const listArr = this._getList()
      const selected = [...this.state.selected]
      const len = selected.length

      if (!len) {
        this.setState({
          selected: [listArr[0][0].value],
          filterInput: '',
        })
        return
      }

      const lastList = listArr[len - 1]
      const currentIndex = lastList.findIndex((item) => item.value === selected[len - 1])

      let lastValue = selected[len - 1]

      if (keyCode === 38 && currentIndex > 0) {
        lastValue = lastList[currentIndex - 1].value
      } else if (keyCode === 40 && currentIndex < lastList.length - 1) {
        lastValue = lastList[currentIndex + 1].value
      }

      selected[len - 1] = lastValue

      this.setState({
        selected,
      })
    } else if (keyCode === 13) {
      // 键盘 回车
      this._handleSelect()
    }
  }

  private _handleMouseEnter = (selected: T[]): void => {
    this.setState({ selected, filterLastResultID: null })
  }

  private _handleSelect = (): void => {
    const { onlyChildSelectable, onChange } = this.props
    const { selected, data } = this.state
    const value: CascaderDataOptionsWithPath<T>[] = []
    if (selected.length) {
      selected.forEach((v, i) => {
        const match = (i === 0 ? data : value[i - 1].children)!.find((val) => val.value === v)
        value.push(match!)
      })
    }

    // 如果选择有children的，则清空输入框
    if (onlyChildSelectable && value.length && value[value.length - 1].children) {
      this.setState({ filterInput: '' })
      onChange && onChange([])
    } else {
      this.setState({ filterInput: null })
      onChange && onChange(selected)
    }

    // 选中后关闭cascader
    window.setTimeout(() => {
      window.document.body.click()
    }, 0)
    ;(window.document.activeElement as HTMLElement).blur() // blur input
  }

  private _handleClear = (event: MouseEvent): void => {
    event.stopPropagation()
    this.setState({ selected: [] }, () => {
      this._handleSelect()
    })
  }

  private _inputValueRender = (): string => {
    const { filterInput, data } = this.state
    const { valueRender, filterable } = this.props
    const selected = this.props.value ?? this.state.selected
    const value: CascaderDataOptionsWithPath<T>[] = []
    if (selected.length) {
      selected.forEach((v, i) => {
        const match = (i === 0 ? data : value[i - 1].children)!.find((val) => v === val.value)
        value.push(match!)
      })
    }

    if (!filterable) {
      return valueRender!(value)
    }

    return filterInput === null ? valueRender!(value) : filterInput
  }

  private _renderChildren = (): ReactNode => {
    const { disabled } = this.props
    let { inputProps } = this.props
    const { data } = this.state
    const inputValue = this._inputValueRender()

    const value: CascaderDataOptionsWithPath<T>[] = []
    const selected = this.props.value ?? this.state.selected
    if (selected.length) {
      selected.forEach((v, i) => {
        const match = (i === 0 ? data : value[i - 1].children)!.find((val) => val.value === v)
        value.push(match!)
      })
    }

    // disabled 的优先级比 inputProps的优先级高
    if (disabled) {
      inputProps = Object.assign({}, inputProps, { disabled })
    }

    return (
      <div className={classNames('gm-cascader', { 'gm-cascader-close': inputValue })}>
        <input
          {...inputProps}
          onChange={this._handleInputChange}
          onKeyDown={this._handleKeyDown}
          type='text'
          value={inputValue}
          className={classNames('form-control', inputProps?.className)}
        />
        {inputValue && (
          <SVGCloseCircle
            className='gm-cascader-icon gm-cascader-close-icon'
            onClick={this._handleClear}
          />
        )}
        <SVGDownSmall className='gm-cascader-icon gm-cascader-down-small' />
        <SVGUpSmall className='gm-cascader-icon gm-cascader-up-small' />
      </div>
    )
  }

  render() {
    const { disabled, popoverStyle, value, style, className, children } = this.props
    const { filterLastResultID } = this.state
    return (
      <Popover
        popup={
          <Overlay
            onMouseEnter={this._handleMouseEnter}
            onSelect={this._handleSelect}
            list={this._getList()}
            selected={value}
            style={style}
            className={className}
            filterLastResultID={filterLastResultID}
          />
        }
        style={popoverStyle}
        disabled={disabled}
      >
        {children ?? this._renderChildren()}
      </Popover>
    )
  }
}

export default Cascader
