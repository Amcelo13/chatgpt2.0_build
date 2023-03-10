import { DocumentData } from "firebase/firestore"
import { type } from "os"

type Props = {
    message: DocumentData
}
function Message({message}: Props ) {
    const isChatGPT = message.user.name === "ChatGPT"  //if it is  chatgpt then give its background color diffferent
  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>   
        <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
            <img src={message.user.avatar} alt="" className="h-10 w-11 rounded-full " />
            <p className="pt-1 text-sm ">{message.text}</p>
        </div>
    </div>
  )
}

export default Message