import React, {
  BaseSyntheticEvent,
  FC,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { devWarnForHook, warn } from '@gm-common/tool'
import Form from './form'
import Affix from '../affix/affix'
import { Button } from '../button'
import { getLocale } from '@gmfe/locales'
import classNames from 'classnames'
import styled from 'styled-components'
import _ from 'lodash'
import { useMutationObserver } from '../../common/hooks'

const AFFIX_HEIGHT = 40

const StyledAffix = styled(Affix)`
  height: ${() => {
    return AFFIX_HEIGHT + 'px'
  }};
`
const options = {
  childList: true,
  attributes: true, // 观察属性变动
  subtree: true,
  characterData: false,
}
export interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  formRefs: RefObject<Form>[]
  onSubmit?(): void
  onSubmitValidated?(): void
  onCancel?(): void
  disabled?: boolean
  /* 确定按钮的文案，默认为保存 */
  saveText?: string
  actions?: ReactNode
}

const FormGroup: FC<FormGroupProps> = ({
  disabled,
  onCancel,
  children,
  formRefs,
  onSubmit,
  saveText,
  actions,
  onSubmitValidated,
  ...rest
}) => {
  devWarnForHook(() => {
    let i = 0
    onSubmit && i++
    onSubmitValidated && i++
    if (i === 0) {
      warn('请提供 onSubmit 或 onSubmitValidated')
    } else if (i > 1) {
      warn('请仅提供 onSubmit 或 onSubmitValidated')
    }
  })

  const [affix, setAffix] = useState(false)
  const bodyRef = useRef(document.querySelector('body'))

  const checkAndChangeAffix = useCallback(() => {
    const BODY_SCROLL_HEIGHT = document.body.scrollHeight
    const WINDOW_INNER_HEIGHT = window.innerHeight

    // 判断是否有滚动条就好
    if (BODY_SCROLL_HEIGHT > WINDOW_INNER_HEIGHT) {
      setAffix(true)
    } else {
      setAffix(false)
    }
  }, [])

  // 只针对body的scrollHeight
  const _observerCallBack = useCallback(_.throttle(checkAndChangeAffix, 1000), [
    checkAndChangeAffix,
  ])

  // 暂时没有其他方案可以监听body---scrollHeight,先通过body中的child变化来触发，内部没很重的逻辑
  useMutationObserver(bodyRef, _observerCallBack, options)

  useEffect(() => {
    const debounceChange = _.debounce(checkAndChangeAffix, 200)
    window.addEventListener('resize', debounceChange)

    return () => window.removeEventListener('resize', debounceChange)
  }, [checkAndChangeAffix])

  useEffect(() => {
    checkAndChangeAffix()
  }, [checkAndChangeAffix])

  const handleSubmit = useCallback(
    (event: BaseSyntheticEvent) => {
      event.preventDefault()
      onSubmit && onSubmit()
      let isPass = true
      formRefs.forEach((form) => {
        if (!form.current!.apiDoValidate()) {
          isPass = false
        }
      })
      if (!isPass) {
        onSubmitValidated && onSubmitValidated()
      }
    },
    [onSubmit, formRefs, onSubmitValidated]
  )

  return (
    <div {...rest} onSubmit={handleSubmit}>
      {children}
      <StyledAffix bottom={0}>
        <div
          className={classNames(
            'gm-padding-tb-5 gm-margin-top-20 text-center', // 统一padding,margin样式，保证affix切换时正常切换
            {
              'gm-form-group-sticky-box': affix, // 仅处理粘底样式
            }
          )}
        >
          <Action
            disabled={disabled}
            actions={actions}
            onSubmit={handleSubmit}
            saveText={saveText}
            onCancel={onCancel}
          />
        </div>
      </StyledAffix>
    </div>
  )
}

export default FormGroup

type ActionProps = Omit<FormGroupProps, 'formRefs' | 'onSubmitValidated' | 'onSubmit'> & {
  onSubmit?(event: BaseSyntheticEvent): void
}

const Action: FC<ActionProps> = ({ onCancel, onSubmit, disabled, saveText, actions }) => {
  return (
    <>
      {onCancel && (
        <>
          <Button onClick={onCancel}>{getLocale('取消')}</Button>
          <div className='gm-gap-10' />
        </>
      )}
      <Button type='primary' disabled={disabled} onClick={onSubmit}>
        {saveText || getLocale('确定')}
      </Button>
      {actions}
    </>
  )
}
