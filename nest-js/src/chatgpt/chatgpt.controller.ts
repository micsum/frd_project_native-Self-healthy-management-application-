import { Controller, Get, Post, Body } from '@nestjs/common';
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
    let token = headers.authorization.replace('Bearer ', '') as string;
    const decodedToken: any = this.jwtService.decodedJWT(token);
    return this.chatgptService.getChatRoomHistory(decodedToken.id);
  }

  @Post('question')
  askQuestion(@Body() body: any, @Headers() headers: any) {
    console.log(headers, body);
    let token = headers.authorization.replace('Bearer ', '') as string;
    const decodedToken: any = this.jwtService.decodedJWT(token);
    return this.chatgptService.askQuestion(body.question, decodedToken.id);
  }
}
