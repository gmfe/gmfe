import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import Popover from '../popover'
import _ from 'lodash'
import SVGCalendar from '../../../svg/calendar.svg'
import Selection from '../selection'

import Overlay from './overlay'

/**
 * DatePicker -- 日期选择
 *
 * 主要功能：日期选择
 * */

class DatePicker extends React.Component {
  state = {
    willActiveSelected: null
  }

  refPopup = React.createRef()

  selectionRef = React.createRef()

  apiDoFocus = () => {
    this.selectionRef.current.apiDoFocus()
  }

  apiDoSelectWillActive = () => {
    const { willActiveSelected } = this.state

    if (willActiveSelected) {
      this.props.onChange(this.state.willActiveSelected)
    } else {
      this.props.onChange(this.props.date || new Date())
    }
  }

  handleSelectDate = date => {
    this.refPopup.current.apiDoSetActive(false)
    this.props.onChange(date)
  }

  handleKeyDown = event => {
    if (
      !(
        event.key === 'ArrowUp' ||
        event.key === 'ArrowRight' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft'
      )
    ) {
      this.props.onKeyDown(event)
      return
    }

    const { date } = this.props
    const { willActiveSelected } = this.state
    let will = willActiveSelected
    if (will === null) {
      will = willActiveSelected
        ? moment(willActiveSelected)
        : date
        ? moment(date)
        : moment()
    }

    if (event.key === 'ArrowUp') {
      will = moment(will).add(-1, 'days')
    } else if (event.key === 'ArrowDown') {
      will = moment(will).add(1, 'days')
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      // 左右不做处理
      this.props.onKeyDown(event)
      return
    }

    this.setState({
      willActiveSelected: will.toDate()
    })
  }

  renderSelected = date => {
    const { renderDate, enabledTimeSelect } = this.props
    if (!date) {
      return ''
    }

    if (renderDate) {
      return renderDate(date)
    }

    if (enabledTimeSelect) {
      return moment(date).format('YYYY-MM-DD HH:mm')
    }
    return moment(date).format('YYYY-MM-DD')
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
        date={date}
        onSelect={this.handleSelectDate}
        willActiveSelected={willActiveSelected}
        min={min}
        max={max}
        disabledDate={disabledDate}
        timeLimit={timeLimit}
        enabledTimeSelect={enabledTimeSelect}
      />
    )

    return (
      <Popover
        ref={this.refPopup}
        popup={popup}
        animName
        disabled={disabled || false}
        type={popoverType}
        style={{ minWidth: '200px' }}
      >
        {children !== undefined ? (
          children
        ) : (
          <Selection
            ref={this.selectionRef}
            {...rest}
            selected={date}
            onSelect={onChange}
            disabled={disabled}
            renderSelected={this.renderSelected}
            className={classNames('gm-datepicker', className)}
            placeholder={placeholder}
            funIcon={<SVGCalendar />}
            onKeyDown={this.handleKeyDown}
          />
        )}
      </Popover>
    )
  }
}

DatePicker.displayName = 'DatePicker'

DatePicker.propTypes = {
  /** Date对象，表示选择的日期 */
  date: PropTypes.object,
  /** 选择日期回调，传入参数为Date对象 */
  onChange: PropTypes.func.isRequired,
  /** - */
  placeholder: PropTypes.string,
  /** 定义日期是否可选 */
  disabled: PropTypes.bool,

  /** Date对象，表示可选的最小日期 */
  min: PropTypes.object,
  /** Date对象，表示可选的最大日期 */
  max: PropTypes.object,
  /** 定义不可选择的日期，传入参数为Date对象，返回true or false */
  disabledDate: PropTypes.func,
  /** 定义日期框内value的展示形式，传入参数为Date对象，返回展示格式，如定义value展示为 'xx月-xx日‘ */
  /** 若有时间选择，需带上时间 */
  renderDate: PropTypes.func,

  popoverType: PropTypes.oneOf(['focus', 'realFocus']),

  className: PropTypes.string,
  style: PropTypes.object,
  onKeyDown: PropTypes.func,

  /** 时间选择 */
  enabledTimeSelect: PropTypes.bool,
  /** 时间点选择限制 - 默认值, 禁用时间段 */
  timeLimit: PropTypes.shape({
    /** 默认开始时间, HH:mm 格式, 没有默认展示为第一个可选时间点 */
    defaultTime: PropTypes.object,
    /** 禁用时间段函数，传入参数为Date对象，返回bool */
    disabledSpan: PropTypes.func,
    /** 时间间隔, 默认30分钟 */
    timeSpan: PropTypes.number
  })
}

DatePicker.defaultProps = {
  onKeyDown: _.noop,
  timeLimit: {
    timeSpan: 30 * 60 * 1000
  },
  enabledTimeSelect: false
}

export default DatePicker
