//THIS COMPONENT ONLT IS FOR FETCHING OPENAI_API_KEY FROM env.local

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, 
})

const openai = new OpenAIApi(configuration);

export default openai;
