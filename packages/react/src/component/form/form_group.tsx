import React, {
  BaseSyntheticEvent,
  FC,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { devWarnForHook, warn } from '@gm-common/tool'
import Form from './form'
import Affix from '../affix/affix'
import { Button } from '../button'
import { getLocale } from '@gmfe/locales'

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
  const formGroupRef = useRef<HTMLDivElement>(null)

  const handleAffix = useCallback(() => {
    !affix && setAffix(true)
  }, [affix])

  useEffect(() => {
    window.addEventListener('scroll', handleAffix)
    return () => {
      window.removeEventListener('scroll', handleAffix)
    }
  }, [handleAffix])

  useLayoutEffect(() => {
    const contentHeight = formGroupRef.current!.offsetHeight
    if (contentHeight > window.innerHeight) {
      setAffix(true)
    }
  }, [])

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

  const action = useMemo(
    () => (
      <Action
        disabled={disabled}
        actions={actions}
        onSubmit={handleSubmit}
        saveText={saveText}
        onCancel={onCancel}
      />
    ),
    [disabled, actions, handleSubmit, saveText, onCancel]
  )

  return (
    <div ref={formGroupRef} {...rest}>
      {children}
      {affix ? (
        <Affix bottom={0}>
          <div className='gm-form-group-sticky-box'>{action}</div>
        </Affix>
      ) : (
        <div className='text-center gm-form-group-btns'>{action}</div>
      )}
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
        {saveText}
      </Button>
      {actions}
    </>
  )
}
