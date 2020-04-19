import React, { ComponentType, FC, useEffect } from 'react'
import SortableJS from 'sortablejs'
import { TableXProps } from '../types'
import _ from 'lodash'

export interface SortableTableXProps<Original extends object> {
  onSortChange(data: Original[]): void
}

function sortableTableXHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  const SortableTableX: FC<Props & SortableTableXProps<Original>> = ({
    id,
    data,
    onSortChange,
    keyField = 'value' as keyof Original,
    ...rest
  }) => {
    id = id ?? `id${+new Date()}${String(Math.random()).slice(2)}`

    useEffect(() => {
      const target: HTMLElement = document.querySelector(`#${id} .gm-table-x-tbody`) as HTMLElement
      const sortable = new SortableJS(target, {
        animation: 150,
        onStart() {
          target.classList.add('gm-table-x-sortable-active')
        },
        onEnd() {
          target.classList.remove('gm-table-x-sortable-active')
        },
        onUpdate: () => {
          const newIds = sortable.toArray()
          const newData = _.sortBy<Original>(data.slice(), (v) =>
            newIds.indexOf((v[keyField] as any) as string)
          )
          onSortChange(newData)
        },
      })
      return () => {
        sortable.destroy()
      }
    }, [data])

    return <Table {...(rest as Props)} id={id} data={data} keyField={keyField} />
  }
  return SortableTableX
}

export default sortableTableXHOC
