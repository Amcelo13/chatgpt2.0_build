'use-client'

import { PlusIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {db} from '../firebase'

function NewChat() {

  const router = useRouter()
  const {data: session} = useSession()

  
  const createNewChat = async()=>{
    
      //Pushing new chat in firestore
      const doc = await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats'),{
            message:[],
            userId : session?.user?.email!,
            createdAt: serverTimestamp()   //to store the global server time of database entry
        })
        router.push(`/chat/${doc.id}`)   //and navigate and enter me to a new chat BY DYNAMIC ROUTING IN REALTIME
  }

  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
        <PlusIcon className="h-4 w-4"/>
        <p>New Chat</p>
    </div>
  )
}

export default NewChat