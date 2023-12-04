import { Table } from '../../components/table/Table.js'
import { Actions } from '../../components/tableActions/Actions.js'

export const BusesPage = () => {
  return (
    <div style={{display: 'flex', gap: '22px', flexDirection: 'column'}}>
      <div style={{backgroundColor: 'white', height: '358px'}}></div>
      <Actions>Добавить маршрут</Actions>
      <Table />
    </div>
  )
}
