import { Map } from '../../components/map/LeafletMap.js'
import { ReactMap } from '../../components/map/Map.jsx'

import { Button } from '../../UI/button/button.js'
import { DropdownField } from '../../UI/input/DropdownField.js'
import { InputField } from '../../UI/input/inputField.js'
import styles from './styles.module.css'
export const MapPage = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.actions}>
        <div style={{ display: 'flex', gap: '8px', maxHeight: 'min-content' }}>
          <InputField config={{ name: 'search', placeholder: 'Поиск' }} />
          <Button bg='primary'>Найти</Button>
        </div>
        <DropdownField options={['asd', 'qwe', 'zcx', 'dhfg']} name='qwertyj' label='DropDown' />
        <DropdownField options={['asd', 'qwe', 'zcx', 'dhfg']} name='qwertyj' label='DropDown' />
      </div>
      <div className={styles.map}>
        {/* <ReactMap /> */}
        <Map />
      </div>
    </div>
  )
}
