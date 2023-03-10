'use client'

import { useSession, signOut} from 'next-auth/react'
import NewChat from './NewChat'
import { collection, query, orderBy} from 'firebase/firestore'
import { db } from '../firebase'
import {useCollection} from 'react-firebase-hooks/firestore'
import ChatRow from './ChatRow'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

function SideBar() {
  const { data: session } = useSession();

  //Fetching chats from firestore
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  console.log("Fetched chat: ", chats);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="">
          {/* New Chat */}
          <NewChat />

          {/* Map through Chat Rows fetched in NewChat.tsx from firestore by "react-firebase-hooks/firestore"*/}
          <div>
            {chats?.docs.map((chat) => {
              return (
                //maping the chats in Chatrow and getting the return in sidebar
                <ChatRow key={chat.id} id={chat.id} />
              );
            })}
          </div>
        </div>
      </div>

      {/* Showing the Profile pic if session exists */}
      {session && (
        <div className="flex items-center mt-4">
          <img
            src={session.user?.image!}
            onClick={() => signOut()}
            alt="Profile Pic"
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          />
          <ArrowRightOnRectangleIcon className='h-5 w-5 text-white mr-2 hover:text-[#babbbf] '/>
          <p className="mr-20 text-white cursor-pointer hover:text-[#babbbf]" onClick={()=>signOut()}>Log Out</p>
        </div>
      )}

      <p className="text"></p>
    </div>
  );
}

export default SideBar;

