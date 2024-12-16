import React ,{useEffect} from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser} = useChatStore();
  
  useEffect(()=>{
   getMessages(selectedUser._id)
  },[getMessages,selectedUser._id]);

  if(isMessagesLoading) return <div>Loading...</div>

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      <ChatHeader />
       <p>Messages</p> 
      <MessageInput />
    </div>
  )
}

export default ChatContainer
