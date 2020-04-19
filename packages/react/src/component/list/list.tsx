import React, { Component, createRef } from 'react'
import { ListProps, BaseListDataOptions, BaseListGroupDataOptions } from './types'
import Base from './base'
import { warn, devWarn } from '@gm-common/tool'
import _ from 'lodash'

class List<V> extends Component<ListProps<V>> {
  static defaultProps = {
    onSelect: _.noop,
    renderItem: (value: BaseListDataOptions<any>) => value.text,
    getItemProps: () => ({}),
  }

  private _baseRef = createRef<Base<V>>()

  constructor(props: ListProps<V>) {
    super(props)
    devWarn(() => {
      if (props.multiple && !_.isArray(props.selected)) {
        // @ts-ignore
        warn('多选情况下 selected 请传数组')
      }
    })
  }

  public apiDoSelectWillActive = (): void => {
    this._baseRef.current!.apiDoSelectWillActive()
  }

  private _handleSelect = (selected: V[]): void => {
    const { multiple, onSelect } = this.props
    if (multiple) {
      onSelect && onSelect(selected)
    } else {
      onSelect && onSelect(selected[0])
    }
  }

  render() {
    const { data, selected, multiple, isGroupList, ...rest } = this.props
    let oData: BaseListGroupDataOptions<V>[]
    if (isGroupList) {
      oData = data as BaseListGroupDataOptions<V>[]
    } else {
      oData = [{ label: '', children: data as BaseListDataOptions<V>[] }]
    }

    let oSelected: V[]
    if (multiple) {
      oSelected = (selected as V[]) ?? []
    } else {
      oSelected = _.isNil(selected) ? [] : [selected as V]
    }
    return (
      <Base
        {...rest}
        ref={this._baseRef}
        selected={oSelected}
        data={oData}
        onSelect={this._handleSelect}
        multiple={multiple}
        isGroupList={isGroupList}
      />
    )
  }
}

export default List
