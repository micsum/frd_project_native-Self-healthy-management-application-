import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { KnexModule } from 'nestjs-knex';
@Module({
  imports: [
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
