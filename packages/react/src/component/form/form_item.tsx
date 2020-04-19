import React, {
  Children,
  ComponentType,
  CSSProperties,
  FC,
  ReactNode,
  useContext,
  ReactElement,
  cloneElement,
} from 'react'
import { devWarnForHook, warn } from '@gm-common/tool'
import classNames from 'classnames'
import _ from 'lodash'
import formContext from './context'
import Validator from '../../validator'
import { Flex } from '../flex'
import { Tooltip } from '../tooltip'

export interface FormItemProps {
  /* 占用栏数 */
  col?: 1 | 2 | 3
  /* 默认从 Form 透传下来 */
  disabledCol?: boolean
  /* 标题，自带`:` */
  label?: string | ReactNode
  tooltip?: ReactNode
  /* 必传，会自动带上校验器 */
  required?: boolean
  /* 去除 label 为了和表单元素对齐的上边距 */
  unLabelTop?: boolean
  /* 自定义表单验证器，优先级高于 error 和 help，低于 required */
  validate?(validator?: (value: any) => string): string
  /**
   * 少用，用于内部展示
   * @deprecated
   */
  error?: boolean
  /**
   * 少用，用于内部展示
   * @deprecated
   */
  help?: string
  /* 默认由 Form 透传下来 */
  labelWidth?: string
  /* 默认由 Form 透传下来 */
  colWidth?: string
  className?: string
  style?: CSSProperties
}

const FormItem: FC<FormItemProps> = ({
  label,
  labelWidth,
  required,
  validate,
  error,
  help,
  unLabelTop,
  className,
  children,
  col = 1,
  disabledCol,
  colWidth,
  style,
  tooltip,
}) => {
  const context = useContext(formContext)
  labelWidth = labelWidth ?? context.labelWidth
  disabledCol = disabledCol ?? context.disabledCol
  colWidth = colWidth ?? context.colWidth
  const { canValidate } = context

  devWarnForHook(() => {
    if (_.isNil(label)) {
      return
    }
    if (typeof label === 'string' && (label.includes(':') || label.includes('：'))) {
      warn('label 包含了 `:` 或 `：`', label)
    }
  })

  const _cw = +colWidth!.replace('px', '')
  const _style: CSSProperties = Object.assign(
    {},
    style,
    disabledCol ? {} : { width: _cw * col }
  )

  if (canValidate && !_.isNil(validate)) {
    if (required) {
      help = validate(function (value) {
        return Validator.validate(Validator.TYPE.required, value)
      })
    } else {
      help = validate()
    }
    error = !!help
  }

  const childList = Children.toArray(children)
  return (
    <Flex
      style={_style}
      className={classNames('gm-form-group', className, {
        'has-error': error,
        'gm-has-error': error,
      })}
    >
      {!_.isNil(label) && (
        <Flex
          justifyEnd
          width={labelWidth}
          className={classNames('gm-form-label', 'control-label', {
            'gm-form-label-un-top': unLabelTop,
          })}
        >
          {required && <span className='gm-text-red gm-text-16'>*</span>}
          {label}
          {label && ':'}
        </Flex>
      )}
      <Flex flex column>
        <div className='gm-form-field'>
          <FormControl>{childList?.[0]}</FormControl>
          {childList?.slice(1)}
          {!!(error && help) && (
            <div className={classNames({ 'help-block': error })}>{help}</div>
          )}
          {tooltip && (
            <Tooltip popup={tooltip} className='gm-padding-lr-5 gm-form-toolTip' />
          )}
        </div>
      </Flex>
    </Flex>
  )
}

FormItem.displayName = 'FormItem'

export default FormItem

interface FormControlChildrenProps {
  className?: string
  type?: string
}

const FormControl: FC = (props) => {
  const children = props.children as ReactElement<
    FormControlChildrenProps,
    ComponentType | string
  >
  const { className } = children.props
  if (
    (children.type === 'input' && children.props.type !== 'file') ||
    children.type === 'textarea' ||
    children.type === 'select' ||
    (children as ReactElement<FormControlChildrenProps, ComponentType>).type
      .displayName === 'InputNumber' ||
    (children as ReactElement<FormControlChildrenProps, ComponentType>).type
      .displayName === 'InputNumberV2' ||
    ((children as ReactElement<FormControlChildrenProps, ComponentType>).type
      .displayName === 'Input' &&
      (children as ReactElement<FormControlChildrenProps, ComponentType>).props.type !==
        'file')
  ) {
    return cloneElement(children, {
      className: classNames('form-control', className),
    })
  }
  return children
}
