import React, {
  CSSProperties,
  Component,
  Children,
  ReactElement,
  cloneElement,
} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import { RadioProps } from './radio'

export interface RadioGroupProps<R> {
  name: string
  value?: R
  onChange?(value: R): void
  inline?: boolean
  className?: string
  style?: CSSProperties
}

class RadioGroup<P extends string | number | string[]> extends Component<
  RadioGroupProps<P>
> {
  static defaultProps = {
    onChange: _.noop,
  }

  render() {
    const {
      onChange,
      value,
      inline,
      className,
      children,
      name,
      ...rest
    } = this.props

    return (
      <div {...rest} className={classNames('gm-radio-group', className)}>
        {Children.map(
          children as ReactElement<RadioProps<P>>,
          (child, index) => {
            const props: RadioProps<P> = {
              checked: child.props.value === value,
              inline,
              onChange(): void {
                onChange && onChange(child.props.value as P)
              },
              name,
            }
            return cloneElement(child, Object.assign({}, props, { key: index }))
          }
        )}
      </div>
    )
  }
}

export default RadioGroup
