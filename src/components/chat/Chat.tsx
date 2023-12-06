import styles from './styles.module.css'
import CloseSVG from '../../assets/icons/Close.svg?react'
import { InputField } from '../../UI/input/inputField.js'
import { Button } from '../../UI/button/button.js'
import SendSVG from '../../assets/icons/Send.svg?react'
import { useKeycloak } from '@react-keycloak/web'
import $api from '../../http/api.ts'

interface ChatProps {
  id: number
  name: string
  bus: string
  rout: string
  userId: string
  messages: {
    chatID: number
    id: number
    message: string
    senderID: string
    senderName: string
    sentAt: string
  }[]
}

export const Chat = ({id, name, bus, rout, messages, userId }: ChatProps) => {
  const { keycloak } = useKeycloak();
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div>
          <p>{name}</p>
          <p className={styles.subtext}>
            Электробус {bus}, маршрут №{rout}
          </p>
        </div>
        <button onClick={close}>
          <CloseSVG />
        </button>
      </div>
      <div className={styles.body}>
        {messages.map(message => (
          <div
            className={
              styles.message_container + (message.senderID == userId ? ' ' + styles.sent : '')
            }
          >
            <div className={styles.message}>
              <p>{message.message}</p>
              <span>{message.sentAt}</span>
            </div>
          </div>
        ))}
        <div className={styles.message_container + ' ' + styles.sent}>
          <div className={styles.message}>
            <p>Lorem ipillo.</p>
            <span>15:03</span>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <InputField config={{ name: '', placeholder: 'Текст' }} />
        <Button bg='primary' clickHandler={() => {
          $api.post('chats', "chats/"+id+"/",  keycloak.token!, {
            message: "Привет",
          })
        }}>
          <SendSVG />
        </Button>
      </div>
    </div>
  )
}
