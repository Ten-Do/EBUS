export const Chats = ({chats, setCurrentChat, setReceiverID}: any) => {
    return chats.map((chat) => (
        <div onClick={() => {setCurrentChat(chat.ID); setReceiverID(chat.ReceiverID)}}>
            {chat.ReceiverID}
        </div>
    )) 
}