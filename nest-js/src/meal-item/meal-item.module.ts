// Buffer Line
import { Module } from '@nestjs/common';
import { MealItemService } from './meal-item.service';
import { MealItemController } from './meal-item.controller';
import { JWTService } from 'src/jwt/jwt.service';
import { JwtAuthGuard } from 'src/authguard/JwtAuthGuard.service';

@Module({
  controllers: [MealItemController],
  providers: [MealItemService, JWTService, JwtAuthGuard],
})
export class MealItemModule {}
