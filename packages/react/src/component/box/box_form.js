import React, { useState } from 'react'
import { Form } from '../form'
import Flex from '../flex'
import IconDownUp from '../icon_down_up'
import Button from '../button'

const BoxFormContext = React.createContext({
  open: false
})

const More = props => {
  return (
    <BoxFormContext.Consumer>
      {({ open }) => {
        if (!open) {
          return null
        }
        return props.children
      }}
    </BoxFormContext.Consumer>
  )
}

const BoxForm = props => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <div className='gm-box gm-box-form'>
      <Flex>
        <Flex flex column>
          <BoxFormContext.Provider
            value={{
              open
            }}
          >
            <Form inline={!open} {...props}>
              {props.children}
            </Form>
          </BoxFormContext.Provider>
        </Flex>
        <Button
          type='link'
          className='gm-padding-right-0'
          onClick={handleToggle}
        >
          {open ? '收起' : ''}高级筛选 <IconDownUp active={open} />
        </Button>
      </Flex>
    </div>
  )
}

BoxForm.More = More

BoxForm.propTypes = {
  ...Form.propTypes
}

export default BoxForm
