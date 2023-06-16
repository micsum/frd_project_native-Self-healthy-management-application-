import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { InjectKnex, Knex } from 'nestjs-knex';
@Injectable()
export class ChatgptService {
  constructor(@InjectKnex() private knex: Knex) {}
  async SetupGpt() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const chat_completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Introduce typescript' }],
    });
    console.log(chat_completion);
  }

  async getChatRoomHistory(currentUserId: number) {
    const hasChatroom = await this.knex('chatroom')
      .select('id')
      .where({ member1_id: currentUserId })
      .orWhere({ member2_id: currentUserId });

    console.log(hasChatroom.length);
    let chatroom_id = hasChatroom[0].id;
    if (hasChatroom.length >= 1) {
      await this.knex('chatroom_message')
        .select('*')
        .where({ id: chatroom_id });
    } else {
      return null;
    }

    // const message = await this.knex('chatroom').select('id').where({});
    return;
  }
}
