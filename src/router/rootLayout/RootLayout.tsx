import { Outlet } from 'react-router-dom'
import { Navbar } from '../../components/navbar/Navbar.js'
import styles from './styles.module.css'

export const RootLayout = () => {
  return (
    <div className={styles.app}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
