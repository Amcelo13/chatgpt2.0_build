//IMPORTING OPENAI FROM CHATGPT 
import openai from './chatpgt'

const query = async (prompt:string, chatId:string, model:string) =>{
    const res = await openai.createCompletion({
        model,
        prompt,
        temperature: 0.9,   //IT will decide the creativity of response by AI AND we can manipulate it
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty:0,
    }).then(res => res.data.choices[0].text)  //Giving back only the first response by AI
    .catch((err)=>`ChatGPT was unable to to find the answer for that! (Error:${err.message})`
    )
    return res
}
export default query
