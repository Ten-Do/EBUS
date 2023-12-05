import { useKeycloak } from '@react-keycloak/web'
import { useEffect, useState } from 'react'
import { Table } from '../../components/table/DriverTable.js'
import { Actions } from '../../components/tableActions/Actions.js'
import $api from '../../http/api.js'
import { IDriver } from '../../types/driver.js'

export const DriversPage = () => {
  const { keycloak } = useKeycloak()
  const [drivers, setDrivers] = useState<IDriver[]>([])
  useEffect(() => {
    $api
      .get('drivers/', keycloak.token!)
      .then(data => data.data.drivers as IDriver[])
      .then(data => {
        console.log(data)
        return data
      })
      .then(data => setDrivers(data))
  }, [])
  return (
    <div style={{ display: 'flex', gap: '22px', flexDirection: 'column' }}>
      <div style={{ backgroundColor: 'white', height: '358px' }}></div>
      <Actions>Добавить водителя</Actions>
      <Table data={drivers} />
    </div>
  )
}
