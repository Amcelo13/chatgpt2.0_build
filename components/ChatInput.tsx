'use client'
import { async } from "@firebase/util"
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, Firestore, serverTimestamp } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { db } from "../firebase"
import {toast} from "react-hot-toast"

type Props ={
    chatId:string
}

function ChatInput({chatId}:Props) {
    const [prompt, setPrompt] = useState("")
    const {data:session} = useSession()

    //useSWR to get the model
    const model = "text-davinci-003"

    const sendMessage = async(e : FormEvent<HTMLFormElement>) =>{
        e.preventDefault
        if(!prompt) return  //to be defensive

        const input = prompt.trim()   //to remove any whitespace at the end
        setPrompt("")  //empty after sending
        
        // INPUT DATA
        const message: Message  = {
            text: input,
            createdAt: serverTimestamp(),
            user :{
                _id :session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui=avatars.com/api/?name=${session?.user?.name}`,
            }
        }
         // Sending the chat to add to Firestore 
                await addDoc(collection(db, 'users', session?.user?.email!, 'chats' ,chatId ,'messages'), 
                message
                );


        // React HOT TOAST ICON TO SAY LOADING
         const notification = toast.loading("ChatGPT is thinking...") 

         
                //Fetch method in backend that will communicate with open ai api
            await fetch('api/askQuestion', {
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    prompt:input, chatId, model, session, 
                })
            }).then(()=>{
                //Toast notification   to say Succesfull after sending the data to api and getting back the answer
                toast.success("ChatGPT has responded!", {
                    id:notification,
                })
            })
            

    }

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
        <form onSubmit={sendMessage}
            className="p-5 space-x-5 flex">
            <input value={prompt} className="bg-transparent outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
            disabled={!session}
            onChange={(e)=> setPrompt(e.target.value)}
            type="text" 
            placeholder="Type here to let AI do wonders.."/>

            <button type="submit" disabled= {!prompt || !session}
            className="bg-[#0088cc] hover:opacity-50 cursor-pointer text-white font-bold px-4 py-2.5 rounded disabled:cursor-not-allowed disabled:bg-gray-600" > 
                <PaperAirplaneIcon className="h-4 w-4 -rotate-45"/>
            </button>

            <div>
                {/* ModelSelection for mobile responsiveness */}
            </div>

        </form>

    </div>
  )
}

export default ChatInput