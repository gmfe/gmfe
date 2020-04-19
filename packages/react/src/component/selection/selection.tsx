import React, {
  Component,
  createRef,
  RefObject,
  cloneElement,
  ReactElement,
  ReactNode,
  KeyboardEvent,
  CSSProperties,
} from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import SVGCloseCircle from '../../../svg/close-circle.svg'
import { IconDownUp } from '../icon_down_up'

export interface SelectionProps<T> {
  selected?: T
  onSelect(selected: null): void
  disabled?: boolean
  renderSelected?(value: T): ReactNode
  placeholder?: string
  /* 代替默认的Icon */
  funIcon?: ReactNode
  /* 无边框 */
  clean?: boolean
  /* 禁用清除 */
  disabledClose?: boolean
  onKeyDown?(event: KeyboardEvent): void
  className?: string
  style?: CSSProperties
  /* 给Select定制 */
  isForSelect?: boolean
}

export default class Selection<T> extends Component<SelectionProps<T>> {
  static defaultProps = {
    renderSelected: (value: { text: string }) => value.text,
  }

  private _inputRef = createRef<HTMLInputElement | HTMLDivElement>()

  public apiDoFocus = (): void => {
    this._inputRef.current!.focus()
  }

  private _handleClear = (): void => {
    const { onSelect, disabled } = this.props
    if (disabled) {
      return
    }
    onSelect(null)
  }

  render() {
    const {
      selected,
      onSelect,
      disabled,
      renderSelected,
      placeholder,
      funIcon,
      clean,
      disabledClose,
      className,
      onKeyDown,
      isForSelect,
      ...rest
    } = this.props
    let text = ''
    if (renderSelected && !_.isNil(selected)) {
      text = renderSelected(selected) as string
    }

    return (
      <div
        {...rest}
        className={classNames(
          'gm-selection',
          {
            disabled,
            'gm-selection-disabled-clean': clean,
            'gm-selection-disabled-close': disabledClose,
          },
          className
        )}
      >
        {isForSelect ? (
          <div
            ref={this._inputRef}
            // @ts-ignore
            disabled={disabled}
            className='form-control gm-selection-selected'
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            {text || placeholder}
          </div>
        ) : (
          <input
            type='text'
            ref={this._inputRef as RefObject<HTMLInputElement>}
            disabled={disabled}
            value={text}
            onChange={() => _.noop()}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className='form-control gm-selection-selected'
          />
        )}
        {selected && !disabledClose && !clean && (
          <SVGCloseCircle
            onClick={this._handleClear}
            className='gm-selection-icon gm-selection-close-icon'
          />
        )}
        {funIcon ? (
          cloneElement(funIcon as ReactElement, {
            className: classNames(
              'gm-selection-icon',
              {
                'gm-selection-fun-icon': selected && !disabledClose && !clean,
              },
              (funIcon as ReactElement).props?.className
            ),
          })
        ) : (
          <IconDownUp
            active={(className ?? '').includes('gm-popover-active')}
            className={classNames('gm-selection-icon', 'gm-selection-down-up', {
              'gm-selection-fun-icon': selected && !disabledClose && !clean,
            })}
          />
        )}
      </div>
    )
  }
}
