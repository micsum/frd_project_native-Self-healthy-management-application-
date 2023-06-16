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

  async getChatRoomId(currentUserId: number) {
    const chatroom_record = await this.knex('chatroom')
      .select('id')
      .where({ member1_id: currentUserId })
      .orWhere({ member2_id: currentUserId });

    if (chatroom_record.length > 0) {
      return chatroom_record[0].id;
    } else {
      let chatgpt_id = (
        await this.knex('user')
          .select('id')
          .where({ email: 'chatGPT@test.com' })
      )[0].id;

      let chatroom_id = (
        await this.knex('chatroom')
          .insert({ member1_id: currentUserId, member2_id: chatgpt_id })
          .returning('id')
      )[0].id;

      return chatroom_id;
    }
  }
}
