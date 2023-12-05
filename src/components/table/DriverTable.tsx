import styles from './styles.module.css'
import PointSVG from '../../assets/icons/Point.svg?react'
import SettingsSVG from '../../assets/icons/Settings.svg?react'

const data: {
  name: string
  rout: string
  bus: string
  status: string
  number: string
  coordinates: number[]
}[] = [
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
  {
    name: 'Иванов Максим Максимович',
    rout: '25443',
    bus: 'ИВ221Т',
    status: 'В работе',
    number: '+7 (999) 567-23-12',
    coordinates: [0, 0],
  },
]

export const Table = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row + ' ' + styles.th}>
        <div className={styles.col_fluid3}>ФИО</div>
        <div className={styles.col_fluid}>Маршрут</div>
        <div className={styles.col_fluid}>Автобус</div>
        <div className={styles.col_fluid2}>Статус</div>
        <div className={styles.col_fluid2}>Номер</div>
        <div className={styles.col_fixed}>На карте</div>
        <div className={styles.col_fixed}>Изменить</div>
      </div>
      {data.map(row => (
        <Row row={row} />
      ))}
    </div>
  )
}

const Row = ({
  row,
}: {
  row: {
    name: string
    rout: string
    bus: string
    status: string
    number: string
    coordinates: number[]
  }
}) => {
  return (
    <div className={styles.row}>
      <div className={styles.col_fluid3}>{row.name}</div>
      <div className={styles.col_fluid}>{row.rout || '-'}</div>
      <div className={styles.col_fluid}>{row.bus || '-'}</div>
      <div className={styles.col_fluid2}>{row.status}</div>
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
