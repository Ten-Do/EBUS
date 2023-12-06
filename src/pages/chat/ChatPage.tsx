import { Chat } from '../../components/chat/Chat.tsx'
import { Chats } from '../../components/chat/Chats.tsx'
import styles from './styles.module.css'
export const ChatPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chats}>
        <Chats />
      </div>
      <div className={styles.chat}>
        <Chat name='Dljl LJljj' bus='123423' rout='eqwr' messages={[]} userId='123'/>
      </div>
    </div> 
  ) 
}
