import { Table } from '../../components/table/DriverTable.js'
import { Actions } from '../../components/tableActions/Actions.js'

export const DriversPage = () => {
  return (
    <div style={{ display: 'flex', gap: '22px', flexDirection: 'column' }}>
      <div style={{ backgroundColor: 'white', height: '358px' }}></div>
      <Actions>Добавить водителя</Actions>
      <Table />
    </div>
  )
}
