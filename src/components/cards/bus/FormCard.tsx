import styles from '../styles.module.css'
import CloseSVG from '../../../assets/icons/Close.svg?react'
import { Button } from '../../../UI/button/button.js'
import { InputField } from '../../../UI/input/inputField.js'
import { DropdownField } from '../../../UI/input/DropdownField.js'
import { formdata2json } from '../../../utils/formdata2json.js'
import $api from '../../../http/api.js'
import { useKeycloak } from '@react-keycloak/web'
import { ReactNode } from 'react'

export const FormCard = ({
  close,
  float = 'right',
  action,
  config,
  children,
}: {
  children?: ReactNode
  close: () => void
  action: string
  float?: 'left' | 'right'
  config: {
    [key: string]: {
      label?: string
      placeholder?: string
      options?: string[]
    }
  }
}) => {
  const { keycloak } = useKeycloak()

  const fields = []
  for (const key in config) {
    fields.push(
      config[key].options ? (
        <DropdownField
          key={key}
          options={config[key].options}
          label={config[key].label}
          name={key}
        />
      ) : (
        <InputField
          key={key}
          label={config[key].label}
          config={{ name: key, placeholder: config[key].placeholder }}
        />
      ),
    )
  }
  return (
    <form
      style={{ [float]: '40px' }}
      onSubmit={e => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const json = {}
        for (const key in config) {
          json[key] = formData.get(key)
        }
        $api.post(action, keycloak.token!, json)
      }}
      className={styles.card}
    >
      <div className={styles.head}>
        <p>Добавить автобус</p>
        <button onClick={close}>
          <CloseSVG />
        </button>
      </div>
      <div className={styles.body + ' ' + styles.form}>
        {fields}
        {/* <InputField
          config={{ name: 'number', placeholder: 'Номер автобуса' }}
          label='Номер автобуса'
        />
        <DropdownField options={['123', '534', '324s', '3ds']} name='' label='Маршрут' />
        <DropdownField options={['Не в работе', 'В работе', 'Зарядка']} name='' label='Статус' /> */}
        {children}
      </div>
      <div>
        <Button bg='primary'>Добавить</Button>
      </div>
    </form>
  )
}
