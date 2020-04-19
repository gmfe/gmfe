import React, { ChangeEvent, CSSProperties, Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

export interface CheckboxProps<P> {
  checked?: boolean
  onChange?(event: ChangeEvent<HTMLInputElement>): void
  value?: P
  disabled?: boolean
  indeterminate?: boolean
  inline?: boolean
  block?: boolean
  col?: number
  name?: string
  className?: string
  style?: CSSProperties
}

class Checkbox<P extends string | number | string[]> extends Component<CheckboxProps<P>> {
  static defaultProps = {
    onChange: _.noop,
  }

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
          ...style,
        }}
        className={classNames(
          'gm-checkbox',
          {
            'gm-checkbox-indeterminate': !checked && indeterminate,
            'gm-checkbox-inline': inline,
            'gm-checkbox-block': block,
            disabled,
          },
          className
        )}
      >
        <input
          className='gm-checkbox-input'
          type='checkbox'
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className='gm-checkbox-span' />
        {children}
      </label>
    )

    if (!inline) {
      return <div>{inner}</div>
    }

    return inner
  }
}

export default Checkbox
