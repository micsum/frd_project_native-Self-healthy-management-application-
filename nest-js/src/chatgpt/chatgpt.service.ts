import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { InjectKnex, Knex } from 'nestjs-knex';
@Injectable()
export class ChatgptService {
  constructor(@InjectKnex() private knex: Knex) {}

  async getChatRoomHistory(user_id: number) {
    try {
      const history = await this.knex('chatroom_message')
        .select('*')
        .where({ user_id })
        .orderByRaw('created_at ASC');

      return history;
    } catch (error) {
      return { error };
    }
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

    let message_id = await this.knex('chatroom_message')
      .insert({
        user_id,
        question,
        answer: chat_completion.data.choices[0].message?.content,
        created_at: new Date(),
      })
      .returning('id');

    return {
      message_id: message_id,
      answer: chat_completion.data.choices[0].message?.content,
    };
  }
}
