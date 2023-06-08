import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { KnexModule } from 'nestjs-knex';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { env } from '../env';
import { MealPlanModule } from './mealplan/mealplan.module';

let knexConfig = require('../knexfile');
let knexProfile = knexConfig[env.NODE_ENV];

@Module({
  imports: [
    HttpModule,
    UserModule,
    WorkoutModule,
    MealPlanModule,
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: knexProfile,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
