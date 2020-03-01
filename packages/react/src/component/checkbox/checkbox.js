import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import classNames from 'classnames'

class Checkbox extends React.Component {
  render() {
    const {
      value,
      checked,
      onChange,
      children,
      name,
      inline,
      block,
      disabled,
      col,
      indeterminate,
      style,
      className,
      ...rest
    } = this.props
    const inner = (
      <label
        {...rest}
        style={{
          width: col ? `${100 / col}%` : 'auto',
          ...style
        }}
        className={classNames(
          'gm-checkbox',
          {
            'gm-checkbox-indeterminate': !checked && indeterminate,
            'gm-checkbox-inline': inline,
            'gm-checkbox-block': block,
            disabled
          },
          className
        )}
      >
        <input
          type='checkbox'
          name={name}
          value={value}
          checked={checked || false}
          onChange={onChange}
          disabled={disabled}
        />
        <span />
        {children}
      </label>
    )

    if (!inline) {
      return <div>{inner}</div>
    }

    return inner
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  /** 半选状态，只控制样式。checked false 才有效 */
  indeterminate: PropTypes.bool,
  inline: PropTypes.bool,
  /** 如果需要整行可点，则 */
  block: PropTypes.bool,
  /** 配合 group 用 */
  col: PropTypes.number,
  /** input name */
  name: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

Checkbox.defaultProps = {
  onChange: _.noop
}

export default Checkbox
