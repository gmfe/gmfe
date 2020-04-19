import React, {
  CSSProperties,
  ReactNode,
  KeyboardEvent,
  Component,
  createRef,
} from 'react'
import classNames from 'classnames'
import moment from 'moment'
import _ from 'lodash'
import { Popover, PopoverTrigger } from '../popover'
import { Selection } from '../selection'
import { TimeLimit } from './types'
import SVGCalendar from '../../../svg/calendar.svg'
import Overlay from './overlay'

export interface DatePickerProps {
  /* 选择的日期 */
  date?: Date | null
  /* 选择日期的回调函数 */
  onChange(date: Date | null): void
  /* 展示栏placeholder */
  placeholder?: string
  /* 禁用 */
  disabled?: boolean
  /* 最小可选日期 */
  min?: Date
  /* 最大可选日期 */
  max?: Date
  /* 自定义禁用日期，优先级高于min，max */
  disabledDate?(date: Date): boolean
  /* 自定义日期展示格式 */
  renderDate?(date: Date): ReactNode
  /* 触发方式 */
  popoverType?: PopoverTrigger
  style?: CSSProperties
  className?: string
  onKeyDown?(event: KeyboardEvent): void
  /* 时间选择 */
  enabledTimeSelect?: boolean
  /* 时间选择限制 */
  timeLimit?: TimeLimit
}

interface DatePickerState {
  willActiveSelected: Date | null
}

class DatePicker extends Component<DatePickerProps, DatePickerState> {
  static defaultProps = {
    onKeyDown: _.noop,
    timeLimit: {
      timeSpan: 30 * 60 * 1000,
    },
  }

  readonly state: DatePickerState = {
    willActiveSelected: null,
  }

  private _popoverRef = createRef<Popover>()
  private _selectionRef = createRef<Selection<Date>>()

  public apiDoFocus(): void {
    this._selectionRef.current!.apiDoFocus()
  }

  public apiDoSelectWillActive(): void {
    const { willActiveSelected } = this.state
    const { onChange, date } = this.props
    onChange(willActiveSelected ?? date ?? new Date())
  }

  private _handleSelectDate = (date: Date): void => {
    this._popoverRef.current!.apiDoSetActive()
    const { onChange } = this.props
    onChange(date)
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (
      !(
        event.key === 'ArrowUp' ||
        event.key === 'ArrowRight' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft'
      )
    ) {
      const { onKeyDown } = this.props
      onKeyDown && onKeyDown(event)
      return
    }
    const { date } = this.props
    const { willActiveSelected } = this.state
    let will = moment(willActiveSelected ?? date ?? undefined)
    if (event.key === 'ArrowUp') {
      will = will.subtract(1, 'days')
    } else if (event.key === 'ArrowDown') {
      will = will.add(1, 'days')
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const { onKeyDown } = this.props
      onKeyDown && onKeyDown(event)
      return
    }
    this.setState({
      willActiveSelected: will.toDate(),
    })
  }

  private _renderSelected = (date: Date): ReactNode => {
    const { renderDate, enabledTimeSelect } = this.props
    if (!date) {
      return ''
    }
    if (renderDate) {
      return renderDate(date)
    }
    const format = enabledTimeSelect ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD'
    return moment(date).format(format)
  }

  render() {
    const {
      date,
      onChange,
      placeholder,
      disabled,
      min,
      max,
      disabledDate,
      className,
      renderDate,
      popoverType,
      onKeyDown,
      timeLimit,
      enabledTimeSelect,
      children,
      ...rest
    } = this.props
    const { willActiveSelected } = this.state
    const popup = (
      <Overlay
        willActiveSelected={willActiveSelected}
        onSelect={this._handleSelectDate}
        max={max}
        date={date!}
        disabledDate={disabledDate}
        min={min}
        timeLimit={timeLimit!}
        enabledTimeSelect={enabledTimeSelect}
      />
    )
    return (
      <Popover
        popup={popup}
        ref={this._popoverRef}
        disabled={disabled}
        type={popoverType}
        style={{ minWidth: '200px' }}
      >
        {children ?? (
          <Selection<Date>
            ref={this._selectionRef}
            {...rest}
            selected={date!}
            onSelect={onChange}
            disabled={disabled}
            renderSelected={this._renderSelected}
            className={classNames('gm-date-picker', className)}
            placeholder={placeholder}
            funIcon={<SVGCalendar />}
            onKeyDown={this._handleKeyDown}
          />
        )}
      </Popover>
    )
  }
}
export default DatePicker
