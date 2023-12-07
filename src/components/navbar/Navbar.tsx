import { Link, useLocation } from 'react-router-dom'
import Logo from '../../assets/icons/FullLogoBlack.svg?react'
import { PAGES } from '../../router/pages.js'
import styles from './styles.module.css'

// import MapSVG from '../../assets/icons/navbar/map.svg?react'
import BusSVG from '../../assets/icons/navbar/bus.svg?react'
import UserGroupSVG from '../../assets/icons/navbar/UsersGroupTwoRounded.svg?react'
import RoutSVG from '../../assets/icons/navbar/rout.svg?react'
import PointSVG from '../../assets/icons/navbar/nb_point.svg?react'
import MenuSVG from '../../assets/icons/navbar/nb_menu.svg?react'
import SettingsSVG from '../../assets/icons/navbar/Settings.svg?react'
import BackArrowSVG from '../../assets/icons/navbar/back_arrow.svg?react'
import { useKeycloak } from '@react-keycloak/web'

export const Navbar = () => {
  const location = useLocation()
  const { keycloak } = useKeycloak()

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div>
          <Logo />
        </div>
      </div>
      <div className={styles.links_container}>
        <Link to={PAGES.buses}>
          <div
            className={
              styles.link + (location.pathname.startsWith(PAGES.buses) ? ' ' + styles.active : '')
            }
          >
            <BusSVG />
            <p>Электробусы</p>
          </div>
        </Link>
        <Link to={PAGES.drivers}>
          <div
            className={
              styles.link + (location.pathname.startsWith(PAGES.drivers) ? ' ' + styles.active : '')
            }
          >
            <UserGroupSVG />
            <p>Водители</p>
          </div>
        </Link>
        <Link to={PAGES.routes}>
          <div
            className={
              styles.link + (location.pathname.startsWith(PAGES.routes) ? ' ' + styles.active : '')
            }
          >
            <RoutSVG />
            <p>Маршруты</p>
          </div>
        </Link>
        <Link to={PAGES.stops}>
          <div
            className={
              styles.link + (location.pathname.startsWith(PAGES.stops) ? ' ' + styles.active : '')
            }
          >
            <PointSVG />
            <p>Остановки</p>
          </div>
        </Link>
        <Link to={PAGES.incedents}>
          <div
            className={
              styles.link + (location.pathname.startsWith(PAGES.incedents) ? ' ' + styles.active : '')
            }
          >
            <MenuSVG />
            <p>Инцеденты</p>
          </div>
        </Link>
        <Link to={PAGES.chat}>
          <div
            className={
              styles.link + (location.pathname.startsWith(PAGES.chat) ? ' ' + styles.active : '')
            }
          >
            <p>Чат</p>
          </div>
        </Link>
      </div>
      <div className={styles.links_container}>
        <Link to={PAGES.settings}>
          <div
            className={
              styles.link +
              (location.pathname.startsWith(PAGES.settings) ? ' ' + styles.active : '')
            }
          >
            <SettingsSVG />
            <p>Настройки</p>
          </div>
        </Link>

        <button className={styles.link} onClick={() => keycloak.logout()}>
          <BackArrowSVG />
          <p>Выход</p>
        </button>
      </div>
    </div>
  )
}
