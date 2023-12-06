import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { Table } from '../../components/table/BusTable.js'
import { Actions } from '../../components/tableActions/Actions.js'
import $api from '../../http/api.js'
import { IBus } from '../../types/bus.js'

export const BusesPage = () => {
  const { keycloak } = useKeycloak()
  const [buses, setBuses] = useState<IBus[]>([])
  useEffect(() => {
    $api
      .get('bus/', keycloak.token!)
      .then(data => data.data.buses as IBus[])
      .then(data => setBuses(data))
  }, [])
  return (
    <div style={{ display: 'flex', gap: '22px', flexDirection: 'column' }}>
      <Actions>Добавить автобус</Actions>
      <Table data={buses} />
    </div>
  )
}
