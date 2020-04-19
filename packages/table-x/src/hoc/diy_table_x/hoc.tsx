import React, { ComponentType, FC, useMemo, useRef, useState } from 'react'
import { Popover, Storage } from '@gmfe/react'
import { getLocale } from '@gmfe/locales'
import { DiyTableXColumn, DiyTableXProps } from './types'
import { TableXColumn, TableXProps } from '../../types'
import { generateDiyColumns, getStorageColumns } from './utils'
import SVGSetting from '../../../svg/setting.svg'
import { TABLE_X, TABLE_X_DIY_ID } from '../../utils'
import DiyTableXModal from './components/modal'
import { OperationIconTip } from '../../components/operation'

function diyTableXHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  const DiyTableX: FC<Props & DiyTableXProps<Original>> = ({
    id,
    columns,
    diyGroupSorting,
    ...rest
  }) => {
    const diyModalRef = useRef<Popover>(null)
    const [diyCols, setDiyCols] = useState(
      () =>
        generateDiyColumns<Original>(
          columns,
          (Storage.get(id) ?? []) as DiyTableXColumn<Original>[]
        )[1]
    )

    const handleDiyColumnsSave = (columns: DiyTableXColumn<Original>[]): void => {
      setDiyCols(columns)
      Storage.set(id, getStorageColumns(columns))
    }

    const handleCancel = (): void => {
      diyModalRef.current!.apiDoSetActive()
    }

    const newColumns: TableXColumn<Original>[] = useMemo(() => {
      const [notDiyCols, cols] = generateDiyColumns<Original>(columns, diyCols)
      return [
        {
          id: TABLE_X_DIY_ID,
          width: TABLE_X.WIDTH_FUN,
          maxWidth: TABLE_X.WIDTH_FUN,
          accessor: TABLE_X_DIY_ID as keyof Original,
          fixed: 'left',
          thClassName: 'gm-table-x-icon-column',
          tdClassName: 'gm-table-x-icon-column',
          Cell: () => null,
          Header: () => (
            <Popover
              ref={diyModalRef}
              showArrow
              offset={-10}
              popup={
                <DiyTableXModal
                  columns={cols}
                  diyGroupSorting={diyGroupSorting}
                  onSave={handleDiyColumnsSave}
                  onCancel={handleCancel}
                />
              }
            >
              <div className='gm-table-x-icon'>
                <OperationIconTip tip={getLocale('表头设置')}>
                  <div>
                    <SVGSetting className='gm-cursor gm-text-hover-primary' />
                  </div>
                </OperationIconTip>
              </div>
            </Popover>
          ),
        },
        ...notDiyCols,
        ...cols,
      ]
    }, [columns, diyCols])

    return <Table {...(rest as any)} id={id} columns={newColumns} />
  }

  return DiyTableX
}

export default diyTableXHOC
