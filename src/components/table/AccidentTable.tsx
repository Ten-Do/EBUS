import styles from './styles.module.css'
import PointSVG from '../../assets/icons/Point.svg?react'
import { IAccident } from '../../types/accident.ts'

export const Table = ({ data = [] }: { data: IAccident[] }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row + ' ' + styles.th}>
        <div className={styles.col_fluid}>Название</div>
        <div className={styles.col_fluid}>Начало</div>
        <div className={styles.col_fluid}>Конец</div>
        <div className={styles.col_fixed}>На карте</div>
      </div>
      {data.map(row => (
        <Row
          key={row.id}
          row={row}
        />
      ))}
    </div>
  )
}

const Row = ({ row }: { row: IAccident }) => {
  return (
    <div className={styles.row}>
      <div className={styles.col_fluid}>{row.Name}</div>
      <div className={styles.col_fluid}>{row.StartDate}</div>
      <div className={styles.col_fluid}>{row.EndDate || '-'}</div>
      <button className={styles.col_fixed}>
        <PointSVG />
      </button>
    </div>
  )
}
