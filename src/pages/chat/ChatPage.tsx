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
  const [currentChat, setCurrentChat] = useState(0);
  const [receiverID, setReceiverID] = useState("0");
  const [subs, setSubs] = useState([])
  const { keycloak } = useKeycloak();
  const [messages, setMessages] = useState({});
  // Получение данных чата
  useEffect(() => {
    if (keycloak.token && centrifuge) {
      $api.get('chats', "chats/", keycloak.token).then(data => {
        const chatsData = data.data.chats;
        setChats(chatsData);
      });
    }
  }, [keycloak, centrifuge]);

  useEffect(() => {
    if (centrifuge && chats.length > 0 ) {
      chats.map((chat) => {
        const newSub = centrifuge.newSubscription('dialog#' + chat.UserID + "," + chat.ReceiverID);
        newSub.on('publication', function (ctx) {
          console.log(ctx.data)
          if(messages[chat.ID]){
            const newMessages = messages
            newMessages[chat.ID].messages = [...newMessages[chat.ID].messages, {
              message: ctx.data.Message,
              senderID: ctx.data.SenderID,
              senderName: ctx.data.SenderName,
              sentAt: ctx.data.SentAt,
            }]
            console.log(newMessages[chat.ID])
            setMessages(newMessages)
          }else{
            const newMessages = messages
            newMessages[chat.ID] = {}
            newMessages[chat.ID].messages = [{
              message: ctx.data.Message,
              senderID: ctx.data.SenderID,
              senderName: ctx.data.SenderName,
              sentAt: ctx.data.SentAt,
            }]
            setMessages(newMessages)
          }
          // setMessages(curr => {...curr, {
          //   // chatID: id,
          //   // id: 0,
          //   message: ctx.data.Message,
          //   senderID: ctx.data.SenderID,
          //   senderName: ctx.data.SenderName,
          //   sentAt: ctx.data.SentAt,
          // }});
        });
        newSub.subscribe();
        setSubs(curr => [...curr, newSub])
      })
    }
  }, [centrifuge, chats]);

  useEffect(() => {
    return () => {
      subs.map((sub) => {
        sub.unsubscribe();
        centrifuge.removeSubscription(sub)
      })

    };
  }, [subs, centrifuge])

  return (
    <div className={styles.container}>
      <div className={styles.chats}>
        <Chats chats={chats} setCurrentChat={setCurrentChat} setReceiverID={setReceiverID}/>
      </div>
      <div className={styles.chat}>
        {currentChat != 0 ? 
        <Chat id={currentChat} 
        name='Dljl LJljj' 
        bus='123423' 
        rout='eqwr' 
        messages={messages} 
        /> : ""
      }
      </div>
    </div>
  )
}
