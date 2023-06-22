import { Module } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { ChatgptController } from './chatgpt.controller';
import { JWTService } from 'src/jwt/jwt.service';

@Module({
  controllers: [ChatgptController],
  providers: [ChatgptService, JWTService],
})
export class ChatgptModule {}
