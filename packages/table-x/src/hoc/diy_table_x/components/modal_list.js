import React from 'react'
import PropTypes from 'prop-types'
import SVGRemove from '../../../../svg/remove.svg'
import _ from 'lodash'

const ModalList = ({ cols, onColsRemove, onColsSort }) => {
  const onRemove = (key, e) => {
    e.stopPropagation()
    onColsRemove(key)
  }

  const handleDragEnter = (key, e) => {
    if(!e.target){
      return
    }
    e.target.style.borderBottom = '2px dashed #008dff';
    e.stopPropagation()
    e.preventDefault()
  }

  const throttleDragEnter = _.throttle(handleDragEnter,1500)

  const handleDragLeave = (key, e) => {
    e.target.style.border = '';
    e.target.style.boxShadow = '';
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDragStart = (key, e) => {
    e.dataTransfer.setData("key", key);
  }

  const handleDrop = (key, e) => {
    if(!e.target){
      return
    }
    const beforekey = e.dataTransfer.getData("key");
    const afterkey = e.target?.attributes?.dragkey?.value
    e.target && (e.target.style.border = '')
    e.target && (e.target.style.boxShadow = '')
    onColsSort(beforekey, afterkey)
    e.stopPropagation()
    e.preventDefault()
  }
  return (
    <ul className='gm-react-table-x-diy-modal-list-ul'>
      {cols.map(item => {
        const { diyItemText, Header, key, diyEnable } = item
        const text = diyItemText || Header
        return (
          <li style={{boxSizing:"border-box"}} className='gm-react-table-x-diy-modal-list-li' dragkey={key} key={key} onDragEnter={throttleDragEnter.bind(this, key)}
          onDragLeave={handleDragLeave.bind(this, key)}
          onDragOver={handleDragEnter.bind(this, key)}
          onDragStart={handleDragStart.bind(this, key)}
          onDrop={handleDrop.bind(this, key)}
          draggable="true">
            {text}
            {diyEnable && (
              <SVGRemove
                onClick={onRemove.bind(this, key)}
                className='gm-cursor gm-react-table-x-diy-modal-list-li-remove'
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

ModalList.propTypes = {
  cols: PropTypes.array.isRequired,
  onColsRemove: PropTypes.func.isRequired,
  onColsSort: PropTypes.func.isRequired,
}

export default ModalList
