// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import query from '../../lib/queryAPI'
import admin from 'firebase-admin'
import { adminDb } from '../../firebaseAdmin'

type Data = {
  answer: string
}

export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // Destructuring the inputs to request.body
    const { prompt, chatId, model, session} = req.body;

    if(!prompt){
        res.status(400).json({answer: "Please provide a prompt"})
        return; 
    }
    if(!chatId){
        res.status(400).json({answer: "Please provide a chatId"})
        return; 
    }

    // CHATGPT QUERY STARTS of response by sending the query to ../../lib/queryAPI
    const response = await query(prompt, chatId, model)

    const message:Message = {
        text: response || "ChatGPT was unable to find an answer for that!",
        createdAt: admin.firestore.Timestamp.now(),
        user:{
            _id:'ChatGPT',
            name:'ChatGPT',
            avatar :"https://links.papareact.com/89k"
        }
    }

    //Now w'have got the response now we send the response to adminDb
    await adminDb.collection('users').doc(session?.user?.email)
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .add(message)

    //Sending back the response FINALLY
  res.status(200).json({ answer: message.text })
}
