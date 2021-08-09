import { getLocale } from '@gmfe/locales'
import React from 'react'
import PropTypes from 'prop-types'
import Flex from '../flex'
import { Checkbox, CheckboxGroup } from '../checkbox'
import { pinYinFilter } from '@gm-common/tool'
import _ from 'lodash'
import SearchSvg from '../../../svg/search.svg'

class Box extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
  }

  handleChange = selectedValues => {
    const { onSelect } = this.props
    onSelect(selectedValues)
  }

  handleSelectAll = checked => {
    const { onSelect } = this.props

    onSelect(
      checked.length === 0 ? [] : _.map(this.getProcessList(), v => v.value)
    )
  }

  handleQuery = e => {
    this.setState({
      query: e.target.value
    })
  }

  getProcessList = () => {
    const { list, withFilter } = this.props
    const { query } = this.state
    if (withFilter === true) {
      return pinYinFilter(list, query, e => e.name)
    } else if (withFilter) {
      return withFilter(list, query)
    }
  }

  render() {
    const {
      selectedValues,

      style,

      title,
      placeholder,
      disabled,
      withFilter
    } = this.props

    const { query } = this.state

    const processList = this.getProcessList()

    return (
      <Flex column className='gm-transfer-box gm-border gm-bg' style={style}>
        {title && (
          <div className='gm-transfer-box-title gm-padding-5 gm-back-bg text-center gm-border-bottom'>
            {title}
          </div>
        )}

        {withFilter ? (
          <div className='gm-transfer-box-filter'>
            <i className='gm-text-desc gm-text-16 gm-line-height-1'>
              <SearchSvg />
            </i>
            <input
              type='text'
              className='form-control'
              value={query}
              disabled={disabled}
              onChange={this.handleQuery}
              placeholder={placeholder}
            />
          </div>
        ) : null}
        <Flex flex column className='gm-bg gm-transfer-box-list gm-overflow-y'>
          <CheckboxGroup
            className='gm-margin-0'
            name={'transferBox' + Math.random()}
            value={selectedValues}
            onChange={this.handleChange}
          >
            {_.map(processList, v => (
              <Checkbox
                key={v.value}
                value={v.value}
                disabled={disabled}
                block
                className='gm-cursor'
              >
                {v.name}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Flex>

        <Flex justifyBetween alignCenter className='gm-border-top'>
          <CheckboxGroup
            name='transferBoxBottom'
            className='gm-margin-0 gm-padding-5'
            value={[
              processList.length !== 0 &&
                processList.length === selectedValues.length
            ]}
            onChange={this.handleSelectAll}
          >
            <Checkbox value disabled={disabled}>
              {getLocale('全选')}
            </Checkbox>
          </CheckboxGroup>
          <div className='gm-padding-lr-5 gm-text-desc'>
            {selectedValues.length}/{processList.length}
          </div>
        </Flex>
      </Flex>
    )
  }
}

Box.propTypes = {
  onSelect: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  withFilter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  style: PropTypes.object,
  disabled: PropTypes.bool
}

export default Box
