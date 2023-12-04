import styles from './styles.module.css'
import PointSVG from '../../assets/icons/Point.svg?react'
import SettingsSVG from '../../assets/icons/Settings.svg?react'

const data: {
  number: string
  rout: string
  id: string
  status: string
  driver: string
  coordinates: number[]
}[] = [
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
  {
    number: 'АВ355К',
    rout: '25443',
    id: '365-246',
    status: 'В работе',
    driver: 'Ефремов П.А.',
    coordinates: [0, 0],
  },
]

export const Table = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row + ' ' + styles.th}>
        <div className={styles.col_fluid}>Номер</div>
        <div className={styles.col_fluid}>Маршрут</div>
        <div className={styles.col_fluid}>Код</div>
        <div className={styles.col_fluid}>Статус</div>
        <div className={styles.col_fluid}>Текущий водитель</div>
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
    number: string
    rout: string
    id: string
    status: string
    driver: string
    coordinates: number[]
  }
}) => {
  return (
    <div className={styles.row}>
      <div className={styles.col_fluid}>{row.number}</div>
      <div className={styles.col_fluid}>{row.rout}</div>
      <div className={styles.col_fluid}>{row.id}</div>
      <div className={styles.col_fluid}>{row.status}</div>
      <div className={styles.col_fluid}>{row.driver}</div>
      <button className={styles.col_fixed}>
        <PointSVG />
      </button>
      <button className={styles.col_fixed}>
        <SettingsSVG />
      </button>
    </div>
  )
}
