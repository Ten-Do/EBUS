import styles from './styles.module.css'
import PointSVG from '../../assets/icons/Point.svg?react'
import SettingsSVG from '../../assets/icons/Settings.svg?react'
import { IDriver, IDriverData } from '../../types/driver.js'

export const Table = ({ data = [] }: { data: IDriver[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row + ' ' + styles.th}>
        <div className={styles.col_fluid3}>ФИО</div>
        <div className={styles.col_fluid}>Маршрут</div>
        <div className={styles.col_fluid}>Автобус</div>
        {/* <div className={styles.col_fluid2}>Статус</div> */}
        <div className={styles.col_fluid2}>Номер</div>
        <div className={styles.col_fixed}>На карте</div>
        <div className={styles.col_fixed}>Изменить</div>
      </div>
      {data.map(row => (
        <Row
          row={{
            name: row.last_name + row.first_name[0] + '.',
            rout: row.route,
            bus: row.bus,
            // status: row.status
            number: row.number,
          }}
        />
      ))}
    </div>
  )
}

const Row = ({ row }: { row: IDriverData }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col_fluid3}>{row.name}</div>
      <div className={styles.col_fluid}>{row.rout || '-'}</div>
      <div className={styles.col_fluid}>{row.bus || '-'}</div>
      {/* <div className={styles.col_fluid2}>{row.status}</div> */}
      <div className={styles.col_fluid2}>{row.number}</div>
      <button className={styles.col_fixed}>
        <PointSVG />
      </button>
      <button className={styles.col_fixed}>
        <SettingsSVG />
      </button>
    </div>
  )
}
