import React, { CSSProperties, Component, Children, cloneElement, ReactElement } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { CheckboxProps } from './checkbox'

export interface CheckboxGroupProps<P> {
  name: string
  value: P[]
  onChange?(value: P[]): void
  inline?: boolean
  block?: boolean
  col?: number
  className?: string
  style?: CSSProperties
}

class CheckboxGroup<P extends string | string[] | number> extends Component<CheckboxGroupProps<P>> {
  static defaultProps = {
    onChange: _.noop,
  }

  private _handleChange(checkboxValue: P): void {
    const { onChange, value } = this.props
    if (value.indexOf(checkboxValue) > -1) {
      onChange && onChange(_.without(value, checkboxValue))
    } else {
      onChange && onChange([...value, checkboxValue])
    }
  }

  render() {
    const { name, value, onChange, inline, block, col, className, children, ...rest } = this.props

    return (
      <div {...rest} className={classNames('gm-checkbox-group', className)}>
        {Children.map(children as ReactElement<CheckboxProps<P>>, (child, index) => {
          const props: CheckboxProps<P> = {
            checked: value.includes(child.props.value as P),
            inline,
            onChange: this._handleChange.bind(this, child.props.value as P),
            name,
            block,
            col,
          }
          return cloneElement(child, Object.assign({}, props, { key: index }))
        })}
      </div>
    )
  }
}

export default CheckboxGroup
