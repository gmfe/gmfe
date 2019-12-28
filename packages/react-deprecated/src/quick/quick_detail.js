import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from '@gmfe/react'
import _ from 'lodash'

class QuickDetailThird extends React.Component {
  constructor(props) {
    super(props)
    console.warn('Deprecated')
  }

  render() {
    const { result, process, unit } = this.props

    return (
      <Flex>
        <Flex
          flex
          column
          alignCenter
          justifyCenter
          className='gm-padding-10 gm-margin-right-20'
          style={{ backgroundColor: '#f1f0f6', height: '78px' }}
        >
          <div>{result.name}</div>
          <div className='gm-text-20'>
            {result.value}
            <span className='gm-text-12'>{unit}</span>
          </div>
        </Flex>

        <Flex flex={process.length}>
          {_.map(process, (item, i) => (
            <Flex
              flex
              column
              alignCenter
              justifyCenter
              className='gm-padding-10'
              key={i}
              style={{ backgroundColor: '#f1f0f6', height: '78px' }}
            >
              <div>{item.name}</div>
              <div className='gm-text-20'>
                {item.value}
                <span className='gm-text-12'>{unit}</span>
              </div>
            </Flex>
          ))}
        </Flex>
      </Flex>
    )
  }
}

QuickDetailThird.propTypes = {
  result: PropTypes.object.isRequired,
  process: PropTypes.array.isRequired, // [{name, value}]
  unit: PropTypes.string.isRequired
}

export default QuickDetailThird
