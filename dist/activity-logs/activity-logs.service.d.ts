import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-logs.entity';
export declare class ActivityLogsService {
    private activityLogRepository;
    constructor(activityLogRepository: Repository<ActivityLog>);
    log(action: 'create' | 'update' | 'delete' | 'move', assetName: string, fromOffice?: string, toOffice?: string): Promise<void>;
    findAll(): Promise<ActivityLog[]>;
}
