import React, { FC, HTMLAttributes, ReactNode, useCallback, useState, MouseEvent } from 'react'
import { Flex } from '../flex'
import { Button } from '../button'
import { getLocale } from '@gmfe/locales'
import { IconDownUp } from '../icon_down_up'

export interface FormPanelProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  left?: ReactNode
  right?: ReactNode
  showBorder?: boolean
}

const More: FC = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleToggle = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()
      setOpen(!open)
    },
    [open]
  )

  return (
    <>
      <div style={{ marginTop: '-10px', paddingBottom: open ? '10px' : '20px' }}>
        <Button type='link' className='gm-padding-right-0' onClick={handleToggle}>
          {open ? getLocale('收起') : getLocale('展开')}
          {getLocale('更多设置')}
          <IconDownUp active={open} />
        </Button>
      </div>
      {open && children}
    </>
  )
}

interface FormPanelFC extends FC<FormPanelProps> {
  More: typeof More
}

const FormPanel: FormPanelFC = ({ title, left, right, children, showBorder = true, ...rest }) => {
  return (
    <div {...rest} className='gm-form-panel'>
      <Flex flex justifyBetween alignEnd className='gm-form-panel-header'>
        <Flex>
          <div className='gm-form-panel-header-tag' />
          <div className='gm-form-panel-header-title'>{title}</div>
        </Flex>
        <Flex column none>
          {left}
        </Flex>
        <Flex flex />
        <Flex column none>
          {right}
        </Flex>
      </Flex>
      {showBorder && <div className='gm-form-panel-border' />}
      <div className='gm-form-panel-content'>{children}</div>
    </div>
  )
}

FormPanel.More = More

export default FormPanel
