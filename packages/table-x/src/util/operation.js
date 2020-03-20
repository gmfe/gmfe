import classNames from 'classnames'
import PropTypes from 'prop-types'
import SVGCheckDetail from '../../svg/check-detail.svg'
import React, { cloneElement, useRef } from 'react'
import { PopupContentConfirm, Popover, Button, ToolTip } from '@gmfe/react'
import styled from 'styled-components'
import SVGDelete from '../../svg/delete.svg'
import SVGPen from '../../svg/pen.svg'
import { getLocale } from '@gmfe/locales'

const IconTip = styled.div`
  padding: 8px;
`

const OperationHeader = () => <div className='text-center'>操作</div>

const OperationIconTip = ({ tip, children }) => {
  const tipRef = useRef()

  const handleClick = fc => {
    tipRef.current.apiDoSetActive()
    fc && fc()
  }

  return (
    <ToolTip popup={<IconTip>{tip}</IconTip>} showArrow>
      {cloneElement(children, {
        onClick: () => handleClick(children.props.onClick)
      })}
    </ToolTip>
  )
}

OperationIconTip.propTypes = {
  tip: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired
}

const OperationCell = props => (
  <div {...props} className={classNames('text-center', props.className)} />
)

OperationCell.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
}

const OperationDetail = ({ href, open, onClick, className, ...rest }) => {
  const handleClick = e => {
    onClick && onClick(e)

    if (href) {
      if (open) {
        window.open(href)
      } else {
        window.location.href = href
      }
    }
  }

  return (
    <OperationIconTip tip={getLocale('详情')}>
      <div
        {...rest}
        onClick={handleClick}
        className={classNames(
          'gm-inline-block gm-cursor gm-padding-5 gm-text-14 gm-text gm-text-hover-primary',
          className
        )}
      >
        <SVGCheckDetail />
      </div>
    </OperationIconTip>
  )
}

OperationDetail.propTypes = {
  /** 如果提供了 href */
  href: PropTypes.string,
  /** true就新开tab页面 */
  open: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}

const OperationDelete = props => {
  const { title, onClick, className, children, ...rest } = props
  const refPopover = useRef()

  const handleDelete = () => {
    refPopover.current.apiDoSetActive(false)
    return onClick()
  }

  const handleCancel = () => {
    refPopover.current.apiDoSetActive(false)
  }

  const popup = (
    <PopupContentConfirm
      type='delete'
      title={title}
      onDelete={handleDelete}
      onCancel={handleCancel}
    >
      {children || '确定删除？'}
    </PopupContentConfirm>
  )

  return (
    <Popover ref={refPopover} right popup={popup} showArrow>
      <div
        {...rest}
        className={classNames(
          'gm-inline-block gm-cursor gm-padding-5 gm-text-14 gm-text gm-text-hover-primary',
          className
        )}
      >
        <OperationIconTip tip={getLocale('删除')}>
          <div>
            <SVGDelete />
          </div>
        </OperationIconTip>
      </div>
    </Popover>
  )
}

OperationDelete.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

const OperationRowEdit = ({
  children,
  isEditing,
  onClick,
  onSave,
  onCancel
}) => {
  const handleClick = () => {
    onClick && onClick()
  }

  const handleSave = () => {
    onSave && onSave()
  }

  const handleCancel = () => {
    onCancel && onCancel()
  }

  return !isEditing ? (
    <OperationCell>
      <OperationIconTip tip={getLocale('编辑')}>
        <span className='gm-padding-5'>
          <SVGPen
            className='gm-inline-block gm-cursor gm-text-14 gm-text gm-text-hover-primary'
            onClick={handleClick}
          />
        </span>
      </OperationIconTip>
      {children}
    </OperationCell>
  ) : (
    <OperationCell>
      <Button type='link' onClick={handleSave}>
        保存
      </Button>
      <span className='gm-padding-lr-5'>|</span>
      <Button type='link' onClick={handleCancel}>
        取消
      </Button>
    </OperationCell>
  )
}

OperationRowEdit.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

export {
  OperationHeader,
  OperationDelete,
  OperationDetail,
  OperationCell,
  OperationRowEdit,
  OperationIconTip
}
