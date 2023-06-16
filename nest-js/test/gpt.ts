import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
config();
async function SetupGpt() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const chat_completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Introduce typescript' }],
  });
  console.log(chat_completion.data.choices[0]);
}

SetupGpt();
