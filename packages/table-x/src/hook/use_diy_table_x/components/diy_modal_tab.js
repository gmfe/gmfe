import React from 'react'
import { Flex, Button, Tabs } from '@gmfe/react'
import DiyModal from './diy_modal'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { getLocale } from '@gmfe/locales'

class DiyModalTab extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.diyList,
    }
  }

  handleChange = (newColumn, index) => {
    const _list = this.state.list.slice()
    _list[index].diyCols = newColumn

    this.setState({
      list: _list,
    })
  }

  handleSave = () => {
    const { onSave, onCancel } = this.props
    const { list } = this.state

    onSave(list.map((o) => ({ columns: o.diyCols })))
    onCancel()
  }

  render() {
    const { onCancel } = this.props
    const { list } = this.state

    return (
      <div className='gm-react-table-x-diy-modal'>
        <Flex
          className='gm-react-table-x-diy-modal-header gm-padding-tb-5'
          justifyBetween
          alignCenter
        >
          <div className='gm-react-table-x-diy-modal-header-title gm-margin-left-10 gm-padding-left-5'>
            {getLocale('表头设置')}
          </div>
          <button
            className='gm-react-table-x-diy-modal-header-close gm-margin-right-10'
            onClick={onCancel}
          >
            ×
          </button>
        </Flex>
        <Tabs tabs={list.map((o) => o.name)}>
          {_.map(list, (item, index) => {
            return (
              <DiyModal
                key={index}
                columns={item.diyCols}
                diyGroupSorting={item.diyGroupSorting}
                onChange={(val) => {
                  return this.handleChange(val, index)
                }}
              />
            )
          })}
        </Tabs>
        <Flex justifyEnd className='gm-padding-10'>
          <Button onClick={onCancel}>取消</Button>
          <div className='gm-gap-10' />
          <Button type='primary' onClick={this.handleSave}>
            保存
          </Button>
        </Flex>
      </div>
    )
  }
}

DiyModalTab.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  diyList: PropTypes.array.isRequired,
}

export default DiyModalTab
