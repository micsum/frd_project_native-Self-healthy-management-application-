import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { InjectKnex, Knex } from 'nestjs-knex';
@Injectable()
export class ChatgptService {
  constructor(@InjectKnex() private knex: Knex) {}

  async getChatRoomHistory(user_id: number) {
    const history = await this.knex('chatroom_message')
      .select('*')
      .where({ user_id })
      .orderByRaw('created_at DESC');

    return history;
  }

  async askQuestion(question: string, user_id: number) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const chat_completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: question }],
    });

    await this.knex('chatroom_message').insert({
      user_id,
      question,
      answer: chat_completion.data.choices[0].message,
    });

    return chat_completion.data.choices[0].message;
  }
}
