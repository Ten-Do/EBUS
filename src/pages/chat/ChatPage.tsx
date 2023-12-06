import { useKeycloak } from '@react-keycloak/web'
import { Chat } from '../../components/chat/Chat.tsx'
import { Chats } from '../../components/chat/Chats.tsx'
import $api from '../../http/api.ts'
import styles from './styles.module.css'
import { useContext, useEffect, useState } from 'react'
import { CentrifugoContext } from '../../Auth.tsx'
export const ChatPage = () => {
  const centrifuge = useContext(CentrifugoContext);
  const [chats, setChats] = useState([]);
  console.log(centrifuge)
  const [messages, setMessages] = useState([])
  const { keycloak } = useKeycloak()
  useEffect(() => {
    if (centrifuge !== null){
      $api.get('chats', "chats/",  keycloak.token!).then(data => {
        console.log()
        const chats = data.data.chats;
        const sub = centrifuge.newSubscription('dialog#'+chats[1].UserID+","+chats[1].ReceiverID);
        sub.on('publication', function(ctx) {
          console.log(ctx.data);
          setMessages([...messages, {
            chatID: 5,
            id: 0,
            message: ctx.data.Message,
            senderID: ctx.data.SenderID,
            senderName: ctx.data.SenderName,
            sentAt: ctx.data.SentAt,
          }])
      });
      
        sub.subscribe();
        // data.data.chats.map((chat) => {
    
        // })
        setChats([...chats,chats[1]])
      })
    }
  }, [centrifuge])




  return (
    <div className={styles.container}>
      <div className={styles.chats}>
        <Chats chats={chats} />
      </div>
      <div className={styles.chat}>
        <Chat id={5} name='Dljl LJljj' bus='123423' rout='eqwr' messages={messages} userId='123'/>
      </div>
    </div> 
  ) 
}
