'use client'

import { useSession, signOut} from 'next-auth/react'
import NewChat from './NewChat'
import { collection } from 'firebase/firestore'
import { db } from '../firebase'
import {useCollection} from 'react-firebase-hooks/firestore'
import ChatRow from './ChatRow'

function SideBar() {
  const {data : session} = useSession()

  //Fetching chats from firestore
  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session?.user?.email!, "chats")
  )
  console.log("Fetched chat: ",chats)

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* New Chat */}
          <NewChat />

          <div>{/* ModelSelection */}</div>

          {/* Map through Chat Rows fetched in NewChat.tsx from firestore by "react-firebase-hooks/firestore"*/}
          <div>
            {chats?.docs.map(chat => {
              return <ChatRow key={chat.id} id={chat.id} />
            })}
          </div>
        </div>
      </div>

      {/* Showing the Profile pic if session exists */}
      {session && (
        <img
          src={session.user?.image!} 
          onClick={() => signOut()}
          alt="Profile Pic" 
          className='h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50'
        />
      )}
    </div>
  )
}

export default SideBar
