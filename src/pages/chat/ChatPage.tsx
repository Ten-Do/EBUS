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
  const [messages, setMessages] = useState([]);
  const { keycloak } = useKeycloak();
  // Получение данных чата
  useEffect(() => {
    if (keycloak.token && centrifuge) {
      $api.get('chats', "chats/", keycloak.token).then(data => {
        const chatsData = data.data.chats;
        setChats(chatsData);
      });
    }
  }, [keycloak, centrifuge]);

  // Установка и отписка от подписки centrifuge
  useEffect(() => {
    if (centrifuge && chats.length > 0) {
      const chat = chats[0];
      const newSub = centrifuge.newSubscription('dialog#' + chat.ReceiverID + "," + chat.UserID);
      newSub.on('publication', function (ctx) {
        setMessages(curr => [...curr, {
          chatID: 5,
          id: 0,
          message: ctx.data.Message,
          senderID: ctx.data.SenderID,
          senderName: ctx.data.SenderName,
          sentAt: ctx.data.SentAt,
        }]);
      });
      newSub.subscribe();

      // Функция очистки
      return () => {
        newSub.unsubscribe();
        centrifuge.removeSubscription(newSub)
      };
    }
  }, [centrifuge, chats]);





  return (
    <div className={styles.container}>
      <div className={styles.chats}>
        <Chats chats={chats} />
      </div>
      <div className={styles.chat}>
        <Chat id={5} name='Dljl LJljj' bus='123423' rout='eqwr' messages={messages} userId={keycloak.token!} />
      </div>
    </div>
  )
}
