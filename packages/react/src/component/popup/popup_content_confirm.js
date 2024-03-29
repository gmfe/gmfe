import React from 'react'
import PropTypes from 'prop-types'
import SVGRemove from '../../../svg/remove.svg'
import Button from '../button'
import classNames from 'classnames'

const PopupContentConfirm = props => {
  const {
    type,
    title,
    onCancel,
    onDelete,
    onSave,
    className,
    children,
    hideClose,
    ...rest
  } = props

  return (
    <div
      {...rest}
      className={classNames('gm-popup-content-confirm', className)}
    >
      <div className='gm-popup-content-confirm-title-wrap'>
        <div className='gm-popup-content-confirm-title'>{title}</div>
        {!hideClose && <div className='gm-popup-content-confirm-close' onClick={onCancel}>
          <SVGRemove />
        </div>}
      </div>
      <div className='gm-popup-content-confirm-content'>
        {children}
        <div className='gm-popup-content-confirm-button'>
          <Button className='gm-margin-right-5' onClick={onCancel}>
            取消
          </Button>
          {type === 'delete' ? (
            <Button type='danger' onClick={onDelete}>
              删除
            </Button>
          ) : (
            <Button type='primary' onClick={onSave}>
              保存
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

PopupContentConfirm.propTypes = {
  type: PropTypes.oneOf(['save', 'delete']),
  title: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSave: PropTypes.func,
  className: PropTypes.string,
  hideClose: PropTypes.bool,
  style: PropTypes.object
}

PopupContentConfirm.defaultProps = {
  type: 'save'
}

export default PopupContentConfirm
