// Buffer Line
import { Module } from '@nestjs/common';
import { MealItemService } from './meal-item.service';
import { MealItemController } from './meal-item.controller';
import { JWTService } from 'src/jwt/jwt.service';

@Module({
  controllers: [MealItemController],
  providers: [MealItemService, JWTService],
})
export class MealItemModule {}
