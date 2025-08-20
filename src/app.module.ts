import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import typeormConfig from './typeorm.config';
import { AssetsModule } from './assets/assets.module';
import { OfficesModule } from './offices/offices.module';
import { ActivityLogsModule } from './activity-logs/activity-logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    AuthModule,
    OfficesModule,
    AssetsModule,
    User,
    ActivityLogsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}