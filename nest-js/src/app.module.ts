import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { KnexModule } from 'nestjs-knex';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
@Module({
  imports: [
    HttpModule,
    UserModule,
    WorkoutModule,
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'postgresql',
          useNullAsDefault: true,
          connection: ':memory:',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
