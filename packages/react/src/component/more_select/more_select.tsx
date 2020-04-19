import React, { Component, createRef } from 'react'
import _ from 'lodash'
import { MoreSelectBaseDataOptions, MoreSelectNormalDataOptions, MoreSelectProps } from './types'
import MoreSelectBase from './base'

class MoreSelect<T> extends Component<MoreSelectProps<T>> {
  static defaultProps = {
    renderSelected: (item: MoreSelectNormalDataOptions<any>) => item.text,
    delay: 500,
    renderListItem: (item: MoreSelectNormalDataOptions<any>) => item.text,
    listHeight: '180px',
    renderListFilterType: 'default',
    popoverType: 'focus',
    onKeyDown: _.noop,
  }

  private _moreSelectBaseRef = createRef<MoreSelectBase<T>>()

  public apiDoFocus = (): void => {
    this._moreSelectBaseRef.current!.apiDoFocus()
  }

  public apiDoSelectWillActive = (): void => {
    this._moreSelectBaseRef.current!.apiDoSelectWillActive()
  }

  private _handleSelect = (selected: MoreSelectNormalDataOptions<T>[]): void => {
    const { onSelect, multiple } = this.props
    if (multiple) {
      onSelect(selected)
    } else {
      onSelect(selected[0])
    }
  }

  render() {
    const { data, selected, multiple, isGroupList, ...rest } = this.props
    let oData: MoreSelectBaseDataOptions<T>[]
    if (isGroupList) {
      oData = data as MoreSelectBaseDataOptions<T>[]
    } else {
      oData = [
        {
          label: '',
          children: data as MoreSelectNormalDataOptions<T>[],
        },
      ]
    }
    let oSelected: MoreSelectNormalDataOptions<T>[]
    if (multiple) {
      oSelected = selected as MoreSelectNormalDataOptions<T>[]
    } else {
      oSelected = selected ? [selected as MoreSelectNormalDataOptions<T>] : []
    }
    return (
      <MoreSelectBase
        {...rest}
        ref={this._moreSelectBaseRef}
        data={oData}
        selected={oSelected}
        onSelect={this._handleSelect}
        multiple={multiple}
        isGroupList={isGroupList}
      />
    )
  }
}

export default MoreSelect
