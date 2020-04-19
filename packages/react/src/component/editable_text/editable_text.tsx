import React, { FC, useCallback, useState, KeyboardEvent, ChangeEvent } from 'react'
import classNames from 'classnames'
import { Input } from '../input'
import SvgOK from '../../../svg/ok.svg'
import SvgRemove from '../../../svg/remove.svg'
import SvgEdit from '../../../svg/edit.svg'

export interface EditableTextProps {
  /* 组件显示的内容 */
  content: string
  onOk?(value: string): void
  onCancel?(): void
  disabled?: boolean
  className?: string
}

const EditableText: FC<EditableTextProps> = ({
  content,
  onCancel,
  onOk,
  disabled,
  className,
  children,
}) => {
  const [value, setValue] = useState(content)
  const [editable, setEditable] = useState(false)

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value)
  }, [])

  const handleOkClick = useCallback((): void => {
    onOk && onOk(value)
    setEditable(false)
  }, [value, onOk])

  const handleCancelClick = useCallback((): void => {
    onCancel && onCancel()
    setEditable(false)
  }, [onCancel])

  const handleEdit = useCallback((): void => {
    if (!disabled) {
      setEditable(true)
    }
  }, [disabled])

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      if (event.keyCode === 13) {
        handleOkClick()
      }
    },
    [handleOkClick]
  )

  const handleInputBlur = useCallback((): void => {
    // 延迟 onBlur 来处理与 onClick 事件的冲突
    setTimeout(handleCancelClick, 300)
  }, [handleCancelClick])

  return editable ? (
    <div className={classNames('gm-editable-text-input-wrap', className)}>
      <Input
        className='form-control input-sm'
        autoFocus
        defaultValue={content}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <div className='gm-gap-5' />
      <SvgOK className='gm-cursor gm-editable-text-icon-ok' onClick={handleOkClick} />
      <div className='gm-gap-5' />
      <SvgRemove className='gm-cursor gm-editable-text-icon-cancel' onClick={handleCancelClick} />
    </div>
  ) : (
    <div className={classNames('gm-editable-text', className)}>
      <span onClick={handleEdit}>{children ?? content ?? '-'}</span>
      {!disabled && (
        <SvgEdit
          className='gm-margin-left-5 gm-cursor gm-editable-text-edit-pen'
          onClick={handleEdit}
        />
      )}
    </div>
  )
}

export default EditableText
