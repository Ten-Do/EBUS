import { ReactNode, useState } from 'react'
import { Button } from '../../UI/button/button.js'
import { InputField } from '../../UI/input/inputField.js'
import styles from './styles.module.css'
import AddRoundedSVG from '../../assets/icons/AddRounded.svg?react'
import { FormCard } from '../cards/bus/FormCard.js'

export const Actions = ({ children }: { children: ReactNode }) => {
  const [showCard, setShowCard] = useState(false)
  return (
    <div className={styles.container}>
      {showCard && (
        <FormCard
        action='bus/'
          config={{
            number: { placeholder: 'Номер автобуса', label: 'Номер автобуса' },
            rouIDt: { options: ['123', '534', '324s', '3ds'], label: 'Маршрут' },
            status: { options: ['Не в работе', 'В работе', 'Зарядка'], label: 'Статус' },
          }}
          close={() => {
            setShowCard(false)
          }}
        />
      )}
      <div className={styles.search}>
        <InputField config={{ name: 'search', placeholder: 'Поиск' }} />
        <Button bg='primary'>Найти</Button>
      </div>
      <div>
        <Button
          bg='primary'
          clickHandler={() => {
            setShowCard(true)
          }}
        >
          <div className={styles.addButton}>
            <AddRoundedSVG />
            <p>{children}</p>
          </div>
        </Button>
      </div>
    </div>
  )
}
