import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { ActivityLogsService } from 'src/activity-logs/activity-logs.service';
import { Office } from 'src/offices/entities/office.entity';
export declare class AssetsService {
    private assetsRepository;
    private officesRepository;
    private activityLogsService;
    constructor(assetsRepository: Repository<Asset>, officesRepository: Repository<Office>, activityLogsService: ActivityLogsService);
    findAll(): Promise<Asset[]>;
    searchGlobal(term: string): Promise<Asset[]>;
    findAllByOffice(officeId: string): Promise<Asset[]>;
    searchByOffice(officeId: string, term: string): Promise<Asset[]>;
    create(assetData: Partial<Asset>): Promise<Asset>;
    findOne(id: string): Promise<Asset>;
    update(id: string, assetData: Partial<Asset>): Promise<Asset>;
    remove(id: string): Promise<void>;
}
