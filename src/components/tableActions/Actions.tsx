import { ReactNode } from 'react'
import { Button } from '../../UI/button/button.js'
import { InputField } from '../../UI/input/inputField.js'
import styles from './styles.module.css'
import AddRoundedSVG from '../../assets/icons/AddRounded.svg?react'

export const Actions = ({ children }: { children: ReactNode }) => (
  <div className={styles.container}>
    <div className={styles.search}>
      <InputField config={{ name: 'search', placeholder: 'Поиск' }} />
      <Button bg='primary'>Найти</Button>
    </div>
    <div>
      <Button bg='primary'>
        <div className={styles.addButton}>
          <AddRoundedSVG />
          <p>{children}</p>
        </div>
      </Button>
    </div>
  </div>
)
