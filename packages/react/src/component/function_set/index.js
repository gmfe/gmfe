import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button'
import Popover from '../popover'
import Overlay from './overlay'
import IconDownUp from '../icon_down_up'
import _ from 'lodash'

const Default = props => {
  const { disabled, active } = props
  return (
    <Button type='primary' plain disabled={disabled}>
      更多功能 &nbsp;
      <IconDownUp active={active} />
    </Button>
  )
}

Default.propTypes = {
  disabled: PropTypes.bool,
  active: PropTypes.bool
}

const Inner = props => {
  const { disabled, className, children, ...rest } = props
  return (
    <div {...rest} className='gm-inline-block'>
      {children || (
        <Default
          active={(className || '').includes('gm-popover-active')}
          disabled={disabled}
        />
      )}
    </div>
  )
}

Inner.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string
}

class FunctionSet extends React.Component {
  refPopover = React.createRef()

  apiDoSetActive = active => {
    this.refPopover.current.apiDoSetActive(active)
  }

  handleSelect = selected => {
    // 只有 onClick 才有意义
    if (!selected.onClick) {
      return
    }
    this.refPopover.current.apiDoSetActive(false)
    selected.onClick()
  }

  render() {
    const { data, right, disabled, children } = this.props

    const newData = _.filter(data, d => d.show !== false)

    if (newData.length === 0) {
      return null
    }

    return (
      <Popover
        ref={this.refPopover}
        popup={
          <Overlay
            data={newData}
            onSelect={this.handleSelect}
            isReverse={right}
          />
        }
        right={right}
        type='hover'
        disabled={disabled}
        pureContainer
      >
        <Inner disabled={disabled}>{children}</Inner>
      </Popover>
    )
  }
}

FunctionSet.propTypes = {
  /** [{text, disabled, show, onClick, children}] */
  data: PropTypes.array.isRequired,
  right: PropTypes.bool,
  disabled: PropTypes.bool
}

export default FunctionSet
