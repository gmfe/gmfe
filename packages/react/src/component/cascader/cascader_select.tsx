import React, { Component, createRef, KeyboardEvent } from 'react'
import classNames from 'classnames'
import { CascaderDataOptions, CascaderSelectProps } from './types'
import { getPropsSelected } from './utils'
import { Flex } from '../flex'
import Cascader from './cascader'

interface CascaderSelectState<T> {
  selected: CascaderDataOptions<T>[][]
  cascaderValue: T[]
}

class CascaderSelect<T> extends Component<CascaderSelectProps<T>, CascaderSelectState<T>> {
  static defaultProps = {
    selectedRender: (value: CascaderDataOptions<any>[]) => value.map((item) => item.name).join(','),
  }

  private _cascaderSelectRef = createRef<HTMLDivElement>()
  readonly state: CascaderSelectState<T> = {
    selected: getPropsSelected(this.props),
    cascaderValue: [],
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Readonly<CascaderSelectProps<T>>) {
    this.setState({ selected: getPropsSelected(nextProps) })
  }

  private _doSelect = (selected: CascaderDataOptions<T>[][]): void => {
    const { multiple, onSelect } = this.props
    onSelect(multiple ? selected : (selected.pop() as CascaderDataOptions<T>[]))
  }

  private _uniq = (selected: CascaderDataOptions<T>[][]) => {
    const obj: { [key: string]: boolean } = {}
    const result: CascaderDataOptions<T>[][] = []
    selected.forEach((value) => {
      const key = value.map((v) => v.value).join(',')
      if (!obj[key]) {
        result.push(value)
        obj[key] = true
      }
    })
    return result
  }

  private _handleClose = (value: CascaderDataOptions<T>[]): void => {
    const { selected } = this.state
    this._doSelect(selected.filter((v) => v !== value))
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Backspace') {
      if (this.state.cascaderValue.length > 0) {
        this.setState({
          cascaderValue: [],
        })
        // @ts-ignore 这个 event.target.value 我没看懂是啥意思
      } else if (event.target.value === '') {
        const { selected } = this.state
        selected.pop()
        this._doSelect(selected)
      }
    }
  }

  private _handleChange = (value: T[]): void => {
    const result: CascaderDataOptions<T>[] = []
    const { data, multiple } = this.props
    this.setState({ cascaderValue: value })
    if (value.length > 0) {
      value.forEach((v, i) => {
        const match = (i === 0 ? data : result[i - 1].children)!.find((val) => v === val.value)
        result.push(match!)
      })
    }

    // 知道没有 children 才认为选择了
    if (!result?.[result.length - 1].children) {
      let n = this.state.selected.slice()
      n.push(result)
      // 过滤
      n = this._uniq(n)
      this._doSelect(n)
      this.setState({ cascaderValue: [] })
      // 单选完后就不继续出浮层
      if (multiple) {
        this._cascaderSelectRef.current!.click()
      }
    }
  }

  render() {
    const {
      disabled,
      inputProps,
      valueRender,
      filterable,
      onlyChildSelectable,
      data,
      selectedRender,
    } = this.props
    const { selected, cascaderValue } = this.state
    return (
      <div
        className={classNames('gm-cascader-select gm-border gm-bg gm-position-relative', {
          disabled: disabled,
          'gm-not-allowed': disabled,
        })}
        ref={this._cascaderSelectRef}
      >
        <Flex className='gm-cascader-select-input'>
          {selected.map((value, index) => (
            <Flex key={index} alignStart className='selected'>
              {selectedRender!(value, index)}
              <button
                disabled={disabled}
                type='button'
                className='close'
                onClick={() => this._handleClose(value)}
              >
                {!disabled && <span>&times;</span>}
              </button>
            </Flex>
          ))}
          <Flex flex column onKeyDown={this._handleKeyDown}>
            <Cascader
              popoverStyle={{ marginTop: '5px' }}
              valueRender={valueRender}
              filterable={filterable}
              data={data}
              onlyChildSelectable={onlyChildSelectable}
              inputProps={inputProps}
              disabled={disabled}
              value={cascaderValue}
              onChange={this._handleChange}
            />
          </Flex>
        </Flex>
      </div>
    )
  }
}

export default CascaderSelect
