import React, { CSSProperties, ReactNode, Component, ChangeEvent } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

export interface SwitchProps {
  type?: string
  checked: boolean
  disabled?: boolean
  on?: ReactNode
  off?: ReactNode
  onChange?(checked: boolean): void
  className?: string
  style?: CSSProperties
}

interface SwitchState {
  checked: boolean
  labelWidth: number | null
  isReady: boolean
}

class Switch extends Component<SwitchProps, SwitchState> {
  static displayName = 'Switch'
  static defaultProps = {
    type: 'default',
    on: '',
    off: '',
    onChange: _.noop,
  }

  readonly state: SwitchState = {
    checked: this.props.checked,
    labelWidth: null,
    isReady: false,
  }

  private _refInputOff: HTMLInputElement
  private _refInputOn: HTMLInputElement

  componentDidMount() {
    // 初始化后开始计算on和off的宽度，取较大值作为switch开关的宽度

    const labelWidth =
      this._refInputOff.offsetWidth >= this._refInputOn.offsetWidth
        ? this._refInputOff.offsetWidth + 7
        : this._refInputOn.offsetWidth + 7

    this.setState({
      labelWidth: Math.max(labelWidth, 34),
      isReady: true,
    })
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Readonly<SwitchProps>) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked,
      })
    }
  }

  setChecked(checked: boolean): void {
    if (!('checked' in this.props)) {
      this.setState({
        checked,
      })
    }
    const { onChange } = this.props
    onChange && onChange(checked)
  }

  private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (this.props.disabled) {
      return
    }
    this.setChecked(event.target.checked)
  }

  render() {
    const {
      className, // checked, onChange, // eslint-disable-line
      type,
      disabled,
      on,
      off,
      ...rest
    } = this.props

    let style: CSSProperties = {
      width: this.state.labelWidth as number,
    }

    if ('style' in rest) {
      style = Object.assign(style, rest.style)
    }

    return (
      <>
        <input
          {...rest}
          data-text={this.state.checked ? on : off}
          ref={(ref) => (this._refInputOff = ref as HTMLInputElement)}
          className={classNames('gm-switch gm-switch-' + type, className, {
            'gm-switch-disabled': disabled,
          })}
          style={style}
          data-attr={this.state.labelWidth}
          disabled={disabled}
          type='checkbox'
          checked={this.state.checked}
          onChange={this._handleChange}
        />
        {!this.state.isReady && (
          <input
            data-text={this.state.checked ? off : on}
            ref={(ref) => (this._refInputOn = ref as HTMLInputElement)}
            className='gm-switch'
            type='checkbox'
            style={{ position: 'fixed', visibility: 'hidden' }}
          />
        )}
      </>
    )
  }
}

export default Switch
