import BaseTable from './base'
import withTableSticky from '../hoc/with_table_sticky'

const Table = withTableSticky(BaseTable, {
  configKey: 'tableConfig',
  stickyClassName: 'gm-react-table-header-sticky'
})

export default Table
