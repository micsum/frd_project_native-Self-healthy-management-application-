import { Controller, Get, Param, Post } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { Headers } from '@nestjs/common';
import { JWTService } from 'src/jwt/jwt.service';

@Controller('chatgpt')
export class ChatgptController {
  constructor(
    private readonly chatgptService: ChatgptService,
    private readonly jwtService: JWTService,
  ) {}

  @Get('history')
  getChatRoomHistory(@Headers() headers: any) {
    console.log(headers);
    let token = headers.authorization.replace('Bearer ', '') as string;
    const decodedToken: any = this.jwtService.decodedJWT(token);
    console.log(decodedToken);
    try {
      return this.chatgptService.getChatRoomHistory(decodedToken.id);
    } catch (error) {
      console.log(error);
      return { error: 'Server error' };
    }
  }

  @Post('question')
  askQuestion(@Headers() headers: any, question: string) {
    let token = headers.authorization.replace('Bearer ', '') as string;
    const decodedToken: any = this.jwtService.decodedJWT(token);
    return this.chatgptService.askQuestion(question, decodedToken.id);
  }
}
