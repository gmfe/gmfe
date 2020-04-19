import React, {
  ChangeEvent,
  Component,
  createRef,
  MouseEvent,
  ReactNode,
  KeyboardEvent,
} from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import {
  MoreSelectBaseDataOptions,
  MoreSelectBaseProps,
  MoreSelectNormalDataOptions,
} from './types'
import { Popover } from '../popover'
import { Flex } from '../flex'
import SVGRemove from '../../../svg/remove.svg'
import SVGCloseCircle from '../../../svg/close-circle.svg'
import { renderListFilterDefault, renderListFilterPinYin } from './render_list_filter'
import { Input } from '../input'
import { Loading } from '../loading'
import { getLocale } from '@gmfe/locales'
import { ListBase } from '../list'
import { findDOMNode } from 'react-dom'

interface MoreSelectBaseState {
  searchValue: string
  loading: boolean
  /* keyboard 默认第一个位置 */
  willActiveIndex: number | null
}

// TODO keydown item disabled
// 目前全键盘还没有这种场景，暂时不管
class MoreSelectBase<T> extends Component<MoreSelectBaseProps<T>, MoreSelectBaseState> {
  static renderListFilterDefault = renderListFilterDefault
  static renderListFilterPinYin = renderListFilterPinYin

  readonly state: MoreSelectBaseState = {
    searchValue: '',
    loading: false,
    willActiveIndex: this.props.isKeyboard ? 0 : null,
  }

  private _isUnmounted = false
  private _baseRef = createRef<HTMLDivElement>()
  private _selectionRef = createRef<Flex>()
  private _popoverRef = createRef<Popover>()
  private _filterData: MoreSelectBaseDataOptions<T>[] | undefined

  constructor(props: MoreSelectBaseProps<T>) {
    super(props)
    if (props.selected.length) {
      this._getFilterData()
      const flatList = this._getFlatFilterData()
      this.state.willActiveIndex = flatList.findIndex((v) => v.value === props.selected[0].value)
    }
  }

  componentWillUnmount() {
    this._isUnmounted = false
  }

  public apiDoFocus = (): void => {
    // 唤起 popover，input autoFocus 会自动聚焦，但是这种方式本质是显示 UI
    // this.popoverRef.current.apiDoSetActive(true)

    // focus更符合直觉
    // eslint-disable-next-line react/no-find-dom-node
    ;(findDOMNode(this._selectionRef.current) as HTMLDivElement).focus()
  }

  public apiDoSelectWillActive = (): void => {
    const { selected, onSelect, multiple } = this.props
    const { willActiveIndex } = this.state
    const flatList = this._getFlatFilterData()
    // 没有做过键盘操作啥也不做
    if (!_.isNil(willActiveIndex) && willActiveIndex < flatList.length) {
      if (multiple) {
        onSelect(_.uniqBy([...selected, flatList[willActiveIndex]], (item) => item.value))
      } else {
        onSelect([flatList[willActiveIndex]])
      }
    }
  }

  private _getFlatFilterData = (): MoreSelectNormalDataOptions<T>[] => {
    return _.flatMap(this._filterData, (v) => v.children)
  }

  private _handleSelect = (values: T[]): void => {
    const { onSelect, data, multiple, selected } = this.props
    const items: MoreSelectNormalDataOptions<T>[] = []
    data.forEach((group) => {
      group.children.forEach((child) => {
        if (values.includes(child.value)) {
          items.push(child)
        }
      })
    })
    selected.forEach((item) => {
      let flag = true // 判断当前已选择的选项中是否存在不在当前data里面的，解决onSearch异步，true则表示都不在data里面
      data.forEach((group) => {
        flag = flag && group.children.every((v) => v.value !== item.value)
      })
      if (flag) {
        items.push(item)
      }
    })
    onSelect(items)

    if (!multiple) {
      // 单选后关闭
      // 要异步
      window.setTimeout(() => {
        if (!this._isUnmounted) {
          this._popoverRef.current!.apiDoSetActive(false)
        }
      }, 0)
    }
  }

  private _handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value
    this.setState({ searchValue })
    this._debounceDoSearch(searchValue)
  }

  private _doSearch = (query: string): void => {
    const { onSearch, data } = this.props
    if (!this._isUnmounted && onSearch) {
      const result = onSearch(query, data)
      if (!result) {
        return
      }
      this.setState({ loading: true })

      Promise.resolve(result).finally(() => {
        this.setState({ loading: false })
      })
    }
  }

  private _debounceDoSearch = _.debounce(this._doSearch, this.props.delay)

  private _handleClear = (clearItem: MoreSelectNormalDataOptions<T>, event: MouseEvent): void => {
    event.stopPropagation()
    const { onSelect, selected } = this.props
    const willSelected = selected.filter((item) => item.value !== clearItem.value)
    onSelect(willSelected)
  }

  private _handlePopupKeyDown = (event: KeyboardEvent): void => {
    const { onKeyDown } = this.props
    let willActiveIndex = this.state.willActiveIndex as number
    if (!onKeyDown) {
      // 没有事件的不用拦截
      return
    }
    // 不是上下方向键不用拦截
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      onKeyDown(event)
      return
    }
    const flatList = this._getFlatFilterData()
    // 没有过滤数据，不用拦截
    if (!flatList.length) {
      onKeyDown(event)
      return
    }

    if (event.key === 'ArrowUp') {
      willActiveIndex--
    } else if (event.key === 'ArrowDown') {
      willActiveIndex++
    }

    // 修正
    if (willActiveIndex < 0) {
      willActiveIndex = flatList.length - 1
    } else if (willActiveIndex > flatList.length - 1) {
      willActiveIndex = 0
    }
    this.setState({ willActiveIndex })
  }

  private _getFilterData = () => {
    const { data, renderListFilter, renderListFilterType } = this.props
    const { searchValue } = this.state
    let filterData: MoreSelectBaseDataOptions<T>[]
    if (renderListFilter) {
      filterData = renderListFilter(data, searchValue)
    } else if (renderListFilterType === 'pinyin') {
      filterData = renderListFilterPinYin(data, searchValue)
    } else {
      filterData = renderListFilterDefault(data, searchValue)
    }
    this._filterData = filterData
    return filterData
  }

  private _renderList = (): ReactNode => {
    const {
      selected,
      multiple,
      isGroupList,
      renderListItem,
      searchPlaceholder,
      listHeight,
      popupClassName,
    } = this.props
    const { loading, searchValue, willActiveIndex } = this.state
    const filterData = this._getFilterData()
    return (
      <div
        className={classNames('gm-more-select-popup', popupClassName)}
        onKeyDown={this._handlePopupKeyDown}
      >
        <div className='gm-more-select-popup-input'>
          <Input
            autoFocus
            className='form-control'
            value={searchValue}
            onChange={this._handleChange}
            placeholder={searchPlaceholder}
          />
        </div>
        <div style={{ height: listHeight }}>
          {loading && (
            <Flex alignCenter justifyCenter className='gm-bg gm-padding-5'>
              <Loading size={20} />
            </Flex>
          )}
          {!loading && !filterData.length && (
            <Flex alignCenter justifyCenter className='gm-bg gm-padding-5 gm-text-desc'>
              {getLocale('没有数据')}
            </Flex>
          )}
          {!loading && !!filterData.length && (
            <ListBase
              selected={selected.map((v) => v.value)}
              data={filterData}
              multiple={multiple}
              isGroupList={isGroupList}
              className='gm-border-0'
              renderItem={renderListItem}
              onSelect={this._handleSelect}
              isScrollTo
              willActiveIndex={willActiveIndex!}
              style={{ height: listHeight }}
            />
          )}
        </div>
      </div>
    )
  }

  render() {
    const {
      isInPopup,
      disabled,
      disabledClose,
      selected,
      multiple,
      placeholder,
      renderSelected,
      className,
      style,
      popoverType,
      children,
    } = this.props
    return (
      <div
        ref={this._baseRef}
        className={classNames(
          'gm-more-select',
          {
            'gm-more-select-disabled': disabled,
            'gm-more-select-multiple': multiple,
          },
          className
        )}
        style={style}
      >
        <Popover
          ref={this._popoverRef}
          type={popoverType}
          popup={this._renderList}
          disabled={disabled}
          isInPopup={isInPopup}
        >
          {children ?? (
            <Flex ref={this._selectionRef} tabIndex={0} wrap className='gm-more-select-selected'>
              {selected.length !== 0 ? (
                selected.map((item) => (
                  <Flex key={item.value as any} className='gm-more-select-selected-item'>
                    <Flex flex column>
                      {renderSelected!(item)}
                    </Flex>
                    {multiple ? (
                      <SVGRemove
                        className='gm-cursor gm-more-select-clear-btn'
                        onClick={disabled ? _.noop : this._handleClear.bind(this, item)}
                      />
                    ) : (
                      !disabledClose && ( // 是否不限时清除按钮，仅单选可用
                        <SVGCloseCircle
                          onClick={disabled ? _.noop : this._handleClear.bind(this, item)}
                          className='gm-cursor gm-more-select-clear-btn'
                        />
                      )
                    )}
                  </Flex>
                ))
              ) : (
                // 加多个 &nbsp; 避免对齐问题，有文本才有对齐
                <div>{placeholder}&nbsp;</div>
              )}
            </Flex>
          )}
        </Popover>
      </div>
    )
  }
}

export default MoreSelectBase
