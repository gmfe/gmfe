import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import IconDownUp from '../icon_down_up'
import Button from '../button'

const More = props => {
  const [open, setOpen] = useState(false)

  const handleToggle = e => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <>
      <div
        style={{
          marginTop: '-10px',
          paddingBottom: open ? '10px' : '20px'
        }}
      >
        <Button
          type='link'
          className='gm-padding-right-0'
          onClick={handleToggle}
        >
          {open ? '收起' : '展开'}更多设置 <IconDownUp active={open} />
        </Button>
      </div>
      {open ? props.children : null}
    </>
  )
}

const FormPanel = ({ title, left, right, children, showBorder, ...rest }) => {
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
      {showBorder ? <div className='gm-form-panel-border' /> : null}
      <div className='gm-form-panel-content'>{children}</div>
    </div>
  )
}

FormPanel.More = More

FormPanel.propTypes = {
  title: PropTypes.string,
  left: PropTypes.element,
  right: PropTypes.element,
  showBorder: PropTypes.bool
}

FormPanel.defaultProps = {
  showBorder: true
}

export default FormPanel
