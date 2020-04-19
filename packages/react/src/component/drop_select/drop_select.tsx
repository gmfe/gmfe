import React, { Component, createRef, ReactNode } from 'react'
import classNames from 'classnames'
import { DropSelectDataOptions, DropSelectProps } from './types'
import { getLocale } from '@gmfe/locales'

interface DropSelectState {
  activeIndex: number | null
}

class DropSelect extends Component<DropSelectProps, DropSelectState> {
  static defaultProps = {
    onEnter(activeIndex: number) {
      console.log(`onEnter index: ${activeIndex}`)
    },
  }

  private _dropSelectRef = createRef<HTMLDivElement>()

  readonly state: DropSelectState = {
    activeIndex: null,
  }

  componentDidMount() {
    window.document.addEventListener('click', this._documentClickHandler)
    window.document.addEventListener('keydown', this._onEscapeKeyUp)
  }

  componentDidUpdate() {
    const selectedDOM = this._dropSelectRef.current!.querySelector('.gm-dropselect-list .active')
    selectedDOM && selectedDOM.scrollIntoView()
  }

  componentWillUnmount() {
    window.document.removeEventListener('click', this._documentClickHandler)
    window.document.removeEventListener('keydown', this._onEscapeKeyUp)
  }

  private _onEscapeKeyUp = (event: KeyboardEvent): void => {
    if (event.key === 'Esc') {
      const { onHide } = this.props
      onHide && onHide()
    }
  }

  private _documentClickHandler = (event: MouseEvent): void => {
    const element = event.target as Element
    if (!this._dropSelectRef.current!.contains(element)) {
      this.setState({ activeIndex: null })
      const { onHide } = this.props
      onHide && onHide()
    }
  }

  private _processData = (data?: DropSelectDataOptions): DropSelectDataOptions => {
    return Object.assign({ loading: false, actions: [], list: [], columns: [] }, data)
  }

  private _handleKeyDown = (length: number, event: React.KeyboardEvent): void => {
    if (!length) {
      return
    }
    let { activeIndex } = this.state
    if (event.key === 'arrowTop') {
      if (activeIndex === null) {
        activeIndex = length
      }
      activeIndex--
    } else if (event.key === 'arrowDown') {
      if (activeIndex === null) {
        activeIndex = -1
      }
      activeIndex++
    } else if (event.key === 'Enter') {
      if (activeIndex === null) {
        return
      }
      const { onEnter } = this.props
      onEnter && onEnter(activeIndex)
    } else {
      return
    }
    this.setState({
      activeIndex: (length + activeIndex) % length,
    })
  }

  render() {
    const { show, data, className, children } = this.props
    const { loading, list, columns, actions } = this._processData(data)
    const { activeIndex } = this.state

    let coolList: ReactNode
    const coolTitle = columns!.map((column) => (
      <div key={column.field} className='gm-ellipsis'>
        {column.name}
      </div>
    ))

    if (loading) {
      coolList = (
        <li className='gm-dropdselect-item'>
          <span>&nbsp;</span>
          <i className='glyphicon glyphicon-refresh glyphicon-spin' />
        </li>
      )
    } else {
      coolList = list!.map((rowData, rowIndex) => {
        const cls = classNames('gm-dropselect-item', { active: activeIndex === rowIndex })
        const row = columns!.map((column, index) => {
          const { field } = column
          const value = rowData[field]
          if (column.render) {
            const val = column.render(value, rowData, rowIndex)
            return (
              <div className='gm-ellipsis' style={{ flex: 1 }} key={index}>
                {val}
              </div>
            )
          } else {
            return (
              <div key={index} className='gm-ellipsis'>
                {value}
              </div>
            )
          }
        })
        const actionDOM = actions!.map((action, index) => {
          const disabled = action.getDisabled ? action.getDisabled(rowData, rowIndex) : false
          return (
            <button
              disabled={disabled}
              key={index}
              className={action.className}
              onClick={action.onClick?.bind(null, rowData)}
            >
              {action.text}
            </button>
          )
        })
        return (
          <li className={cls} key={rowData.id}>
            {row}
            {!!actionDOM.length && <div>{actionDOM}</div>}
          </li>
        )
      })
    }

    return (
      <div
        className={classNames('gm-dropselect', className)}
        ref={this._dropSelectRef}
        onKeyDown={this._handleKeyDown.bind(this, list!.length)}
      >
        {children}
        <div className='gm-dropselect-wrap'>
          <div
            className='gm-dropselect-list-wrap gm-box-shadow-bottom'
            style={{ display: show ? 'block' : 'none' }}
          >
            <ul className='gm-dropselect-list'>
              <li className='gm-dropselect-item gm-dropselect-title'>
                {coolTitle}
                {!!actions!.length && <div>{getLocale('操作')}</div>}
              </li>
              {coolList}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default DropSelect
