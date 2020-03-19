import { getLocale } from '@gmfe/locales'
import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Affix from '../affix'
import _ from 'lodash'
import Button from '../button'
import { warn, devWarnForHook } from 'gm-util'

const Action = ({ onCancel, onSubmit, disabled, saveText, actions }) => {
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

Action.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  disabled: PropTypes.bool,
  /** save按钮文案，默认保存 */
  saveText: PropTypes.string,
  actions: PropTypes.element
}

/** 聚合多个表单，统一处理 submit */
const FormGroup = ({
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
      warn('请提供 onSubmit or onSubmitValidated')
    } else if (i > 1) {
      warn('请仅提供其一 onSubmit or onSubmitValidated')
    }
  })

  const [affix, setAffix] = useState(false)
  const formGroupRef = useRef(null)
  const handleAffix = () => {
    !affix && setAffix(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleAffix)
    return () => {
      window.removeEventListener('scroll', handleAffix)
    }
  }, [])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      onSubmit && onSubmit()

      let isPass = true

      _.each(formRefs, form => {
        if (!form.current.apiDoValidate()) {
          isPass = false
        }
      })

      if (isPass) {
        onSubmitValidated && onSubmitValidated()
      }
    },
    [onSubmit, formRefs, onSubmitValidated]
  )

  // 为了内部引用值引起维护方的注意，故抽出纯函数的形式来使用,但是不知道这里为什么要memo
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

  useEffect(() => {
    const contentHeight = formGroupRef.current.offsetHeight
    if (contentHeight > window.innerHeight) {
      setAffix(true)
    }
  }, [])

  return (
    <div ref={formGroupRef} {...rest} onSubmit={handleSubmit}>
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

FormGroup.propTypes = {
  formRefs: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
  onSubmitValidated: PropTypes.func,
  onCancel: PropTypes.func,
  disabled: PropTypes.bool,
  /** save按钮文案，默认保存 */
  saveText: PropTypes.string,
  actions: PropTypes.element
}

FormGroup.defaultProps = {
  saveText: getLocale('保存'),
  btnAffix: false
}

export default FormGroup
