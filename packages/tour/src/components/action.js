import React from 'react'
import PropTypes from 'prop-types'

const Action = ({ isLastItem, goToNextStep, close }) => {
  return (
    <div className='gm-flex gm-flex-justify-end gm-padding-top-10 '>
      {isLastItem ? (
        <button className='btn btn-primary' onClick={close}>
          马上尝试
        </button>
      ) : (
        <button className='btn btn-primary' onClick={goToNextStep}>
          下一步
        </button>
      )}
    </div>
  )
}

Action.propTypes = {
  isLastItem: PropTypes.bool.isRequired,
  goToNextStep: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

export default Action
