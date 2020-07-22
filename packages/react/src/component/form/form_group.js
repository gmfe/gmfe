import { getLocale } from '@gmfe/locales'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import Affix from '../affix'
import _ from 'lodash'
import Button from '../button'
import { warn, devWarnForHook } from '@gm-common/tool'
import classNames from 'classnames'
import styled from 'styled-components'
import { useMutationObserver } from '../../common/hooks'

const AFFIX_HEIGHT = 40

const StyledAffix = styled(Affix)`
  height: ${() => {
    return AFFIX_HEIGHT + 'px'
  }};
`

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

const options = {
  childList: true,
  attributes: true, // 观察属性变动
  subtree: true,
  characterData: false
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
    checkAndChangeAffix
  ])

  // 暂时没有其他方案可以监听body---scrollHeight,先通过body中的child变化来触发，内部没很重的逻辑
  useMutationObserver(bodyRef, _observerCallBack, options)

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

  useEffect(() => {
    const debounceChange = _.debounce(checkAndChangeAffix, 200)
    window.addEventListener('resize', debounceChange)

    return () => window.removeEventListener('resize', debounceChange)
  }, [])

  useEffect(() => {
    console.log(777)
    checkAndChangeAffix()
  }, [])

  return (
    <div {...rest} onSubmit={handleSubmit}>
      {children}
      <StyledAffix bottom={0}>
        <div
          className={classNames(
            'gm-padding-tb-5 gm-margin-top-20 text-center', // 统一padding,margin样式，保证affix切换时正常切换
            {
              'gm-form-group-sticky-box': affix // 仅处理粘底样式
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
