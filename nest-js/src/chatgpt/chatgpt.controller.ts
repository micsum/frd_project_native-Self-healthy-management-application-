import { Controller, Get, Param, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @Post()
  SetupGpt() {
    return this.chatgptService.SetupGpt();
  }

  @Get()
  getChatRoomId() {
    return this.chatgptService.getChatRoomId(1);
  }
  @Get('history/:id')
  getChatRoomHistory(@Param('id') id: number) {
    return this.chatgptService.getChatRoomHistory(id);
  }

  @Post()
  askQuestion() {
    return this.chatgptService.askQuestion();
  }

  @Get()
  answerQuestion() {
    return this.chatgptService.answerQuestion();
  }
}
