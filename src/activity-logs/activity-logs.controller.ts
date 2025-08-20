import { Controller, Get } from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';

@Controller('api/activities')
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @Get()
  findAll() {
    return this.activityLogsService.findAll();
  }
}