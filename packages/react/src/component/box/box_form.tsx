import React, { createContext, FC, ReactElement, useContext, useState } from 'react'
import _ from 'lodash'
import { Form, FormProps } from '../form'
import { Flex } from '../flex'
import { Button } from '../button'
import { IconDownUp } from '../icon_down_up'
import { getLocale } from '@gmfe/locales'

interface BoxFormContextOptions {
  open: boolean
  onHasMore(): void
}

const boxFormContext = createContext<BoxFormContextOptions>({
  open: false,
  onHasMore: _.noop,
})

const { Provider } = boxFormContext

const More: FC = ({ children }) => {
  const { open, onHasMore } = useContext(boxFormContext)
  onHasMore()
  if (!open) {
    return null
  }
  return children as ReactElement
}

interface BoxFormFC extends FC<FormProps> {
  More: typeof More
}

const BoxForm: BoxFormFC = ({ children, ...rest }) => {
  const [hasMore, setHasMore] = useState(false)
  const [open, setOpen] = useState(false)

  const handleToggle = (): void => {
    setOpen(!open)
  }

  const handleHasMore = (): void => {
    if (!hasMore) {
      setHasMore(true)
    }
  }

  return (
    <div className='gm-box gm-box-form'>
      <Flex>
        <Flex flex column>
          <Provider value={{ open, onHasMore: handleHasMore }}>
            <Form inline={!open} {...rest}>
              {children}
            </Form>
          </Provider>
        </Flex>
        {hasMore && (
          <Button type='link' className='gm-padding-right-0' onClick={handleToggle}>
            {open && getLocale('收起')}
            {getLocale('高级筛选')} <IconDownUp active={open} />
          </Button>
        )}
      </Flex>
    </div>
  )
}

BoxForm.More = More

export default BoxForm
