import { Controller, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';

@Controller('chatgpt')
export class ChatgptController {
  constructor(private readonly chatgptService: ChatgptService) {}

  @Post()
  SetupGpt() {
    return this.chatgptService.SetupGpt();
  }
}
