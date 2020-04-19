import React, { ChangeEvent, Component, CSSProperties, MouseEvent } from 'react'
import _ from 'lodash'
import classNames from 'classnames'

export interface RadioProps<R> {
  checked?: boolean
  onChange?(event: ChangeEvent<HTMLInputElement>): void
  value?: R
  disabled?: boolean
  inline?: boolean
  block?: boolean
  name?: string
  onClick?(event: MouseEvent<HTMLInputElement>): void
  className?: string
  style?: CSSProperties
}

class Radio<P extends string | number | string[]> extends Component<RadioProps<P>> {
  static defaultProps = {
    onChange: _.noop,
    onClick: _.noop,
  }

  render() {
    const {
      value,
      checked,
      onChange,
      onClick,
      children,
      inline,
      block,
      name,
      disabled,
      className,
      ...rest
    } = this.props

    const inner = (
      <label
        {...rest}
        className={classNames(
          'gm-radio',
          {
            'gm-radio-inline': inline,
            'gm-radio-block': block,
            disabled,
          },
          className
        )}
      >
        <input
          type='radio'
          className='gm-radio-input'
          name={name}
          value={value}
          checked={checked || false}
          onChange={onChange}
          onClick={onClick}
          disabled={disabled}
        />
        <span className='gm-radio-span' />
        {children}
      </label>
    )

    if (!inline) {
      return <div>{inner}</div>
    }
    return inner
  }
}

export default Radio
