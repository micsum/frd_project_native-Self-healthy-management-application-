import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JWTService } from 'src/jwt/jwt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, JWTService],
})
export class UserModule {}
