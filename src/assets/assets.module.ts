import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { Office } from 'src/offices/entities/office.entity';
import { ActivityLogsModule } from 'src/activity-logs/activity-logs.module';


@Module({
  imports: [TypeOrmModule.forFeature([Asset, Office]), ActivityLogsModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}