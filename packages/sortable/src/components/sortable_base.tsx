import React, { Component } from 'react'
import Sortable, { Options, SortableEvent, MoveEvent } from 'sortablejs'
import { SortableBaseProps } from './types'

type SortableEventType = Extract<
  keyof Options,
  | 'onChoose'
  | 'onStart'
  | 'onEnd'
  | 'onAdd'
  | 'onUpdate'
  | 'onSort'
  | 'onRemove'
  | 'onFilter'
  | 'onMove'
  | 'onClone'
>

const SORTABLE_EVENTS: SortableEventType[] = [
  'onChoose',
  'onStart',
  'onEnd',
  'onAdd',
  'onUpdate',
  'onSort',
  'onRemove',
  'onFilter',
  'onMove',
  'onClone',
]

interface Store {
  nextSibling: Element | null
  activeComponent: SortableBase | null
}

const store: Store = { nextSibling: null, activeComponent: null }

class SortableBase extends Component<SortableBaseProps> {
  static defaultProps = {
    options: {},
    tag: 'div',
    style: {},
  }

  private _node: HTMLElement | undefined
  private _sortable: Sortable | undefined

  componentDidMount() {
    const option: Options = { ...this.props.options, disabled: this.props.disabled }
    SORTABLE_EVENTS.forEach((name) => {
      const eventHandler = option[name] as (
        event: SortableEvent | MoveEvent,
        originalEvent?: Event
      ) => void | boolean | -1 | 1
      ;(option[name] as (
        event: SortableEvent | MoveEvent,
        originalEvent?: Event
      ) => void | boolean | -1 | 1) = (event, originalEvent) => {
        const _evt = event as SortableEvent
        if (name === 'onChoose') {
          store.nextSibling = _evt.item.nextElementSibling
          store.activeComponent = this
        } else if ((name === 'onAdd' || name === 'onUpdate') && this.props.onChange) {
          const items = this._sortable?.toArray()
          const remote = store.activeComponent
          const remoteItems = remote?._sortable?.toArray()
          const referenceNode =
            store.nextSibling && store.nextSibling.parentNode !== null ? store.nextSibling : null
          _evt.from.insertBefore(_evt.item, referenceNode)
          if (remote !== this) {
            const remoteOptions = remote?.props.options ?? {}
            if (typeof remoteOptions.group === 'object' && remoteOptions.group.pull === 'clone') {
              // remove the node with the same data-id
              _evt.item.parentNode?.removeChild(_evt.item)
            }
            remote?.props.onChange && remote.props.onChange(remoteItems!, remote._sortable!, _evt)
          }
          this.props.onChange && this.props.onChange(items!, this._sortable!, _evt)
        }

        if ((event as MoveEvent).type === 'move') {
          return eventHandler ? eventHandler(event, originalEvent) : true
        }
        setTimeout(() => {
          eventHandler && eventHandler(event)
        }, 0)
      }
    })
    this._sortable = Sortable.create(this._node!, option) // 不可直接解构使用 create，原因未知
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: Readonly<SortableBaseProps>) {
    if (nextProps.disabled !== this.props.disabled) {
      this._sortable?.option('disabled', nextProps.disabled)
    }
  }

  shouldComponentUpdate(nextProps: Readonly<SortableBaseProps>): boolean {
    // If onChange is null, it is an UnControlled component
    // Don't let React re-render it by setting return to false
    return !!nextProps.onChange
  }

  componentWillUnmount() {
    if (this._sortable) {
      this._sortable.destroy()
      this._sortable = undefined
    }
  }

  render() {
    const { tag: Tag, options, onChange, disabled, ...rest } = this.props
    return <Tag {...rest} ref={(ref: HTMLElement) => (this._node = ref)} />
  }
}

export default SortableBase
