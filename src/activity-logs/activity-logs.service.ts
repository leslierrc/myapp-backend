import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-logs.entity';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectRepository(ActivityLog)
    private activityLogRepository: Repository<ActivityLog>,
  ) {}

  async log(
    action: 'create' | 'update' | 'delete' | 'move',
    assetName: string,
    fromOffice?: string,
    toOffice?: string,
  ) {
    const log = this.activityLogRepository.create({
      action,
      assetName,
      fromOffice,
      toOffice,
    });
    await this.activityLogRepository.save(log);
  }

  async findAll(): Promise<ActivityLog[]> {
    return this.activityLogRepository.find({
      order: { timestamp: 'DESC' },
      take: 5,
    });
  }
}