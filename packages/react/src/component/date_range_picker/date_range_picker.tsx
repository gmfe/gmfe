import React, { Component, createRef, ReactNode } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import moment from 'moment'
import { DateRangePickerProps } from './types'
import { Popover } from '../popover'
import { Selection } from '../selection'
import SVGCalendar from '../../../svg/calendar.svg'
import { getLocale } from '@gmfe/locales'
import { renderTime } from './util'
import Overlay from './overlay'

class DateRangePicker extends Component<DateRangePickerProps> {
  static displayName = 'DateRangePicker'

  static defaultProps = {
    onChange: _.noop,
    timeSpan: 30 * 60 * 1000,
  }

  private _popoverRef = createRef<Popover>()
  private _selectionRef = createRef<Selection<{ begin: Date; end: Date }>>()

  public apiDoFocus = (): void => {
    this._selectionRef.current!.apiDoFocus()
  }

  private _handleOk = (begin: Date, end: Date): void => {
    this._popoverRef.current!.apiDoSetActive()
    const { onChange } = this.props
    onChange && onChange(begin, end)
  }

  private _handleCancel = (): void => {
    this._popoverRef.current!.apiDoSetActive()
  }

  private _handleSelect = (selected: null): void => {
    const { onChange } = this.props
    onChange && onChange(selected, selected)
  }

  render() {
    const {
      begin,
      end,
      onChange,
      disabled,
      min,
      max,
      disabledDate,
      canClear,
      className,
      children,
      renderDate,
      enabledTimeSelect,
      beginTimeSelect,
      endTimeSelect,
      timeSpan,
      customQuickSelectList,
      ...rest
    } = this.props

    const popup = (
      <Overlay
        begin={begin}
        end={end}
        min={min}
        max={max}
        onOK={this._handleOk}
        onCancel={this._handleCancel}
        disabledDate={disabledDate}
        enabledTimeSelect={enabledTimeSelect}
        beginTimeSelect={beginTimeSelect}
        endTimeSelect={endTimeSelect}
        timeSpan={timeSpan}
        customQuickSelectList={customQuickSelectList}
      />
    )

    const renderSelected = (item: { begin: Date; end: Date }): ReactNode => {
      if (renderDate && item.begin && item.end) {
        return <>{renderDate(item.begin, item.end)}</>
      }

      let b: ReactNode = <span className='gm-text-desc'>{getLocale('开始日期')}</span>
      let e: ReactNode = <span className='gm-text-desc'>{getLocale('结束日期')}</span>
      if (item.begin) {
        const _begin = moment(item.begin)
        b = _begin.format('YYYY-MM-DD')
        if (enabledTimeSelect) {
          b += ' '
          b += renderTime(_begin)
        }
      }

      if (item.end) {
        const _end = moment(item.end)
        e = _end.format('YYYY-MM-DD')
        if (enabledTimeSelect) {
          e += ' '
          e += renderTime(_end)
        }
      }

      return (
        <>
          {b}&nbsp;~&nbsp;{e}
        </>
      )
    }

    return (
      <Popover
        popup={popup}
        disabled={disabled}
        ref={this._popoverRef}
        style={{ minWidth: '500px' }}
      >
        {children ?? (
          <Selection
            ref={this._selectionRef}
            {...rest}
            selected={{ begin, end }}
            onSelect={this._handleSelect}
            disabled={disabled}
            renderSelected={renderSelected}
            placeholder=''
            disabledClose={!canClear}
            className={classNames('gm-range-range-picker', className)}
            funIcon={<SVGCalendar />}
            isForSelect
          />
        )}
      </Popover>
    )
  }
}
export default DateRangePicker
