import { AssetsService } from './assets.service';
import { Asset } from './entities/asset.entity';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    searchGlobal(term?: string): Promise<Asset[]>;
    findByOffice(officeId: string): Promise<Asset[]>;
    searchByOffice(officeId: string, term: string): Promise<Asset[]>;
    create(assetData: Partial<Asset>): Promise<Asset>;
    update(id: string, assetData: Partial<Asset>): Promise<Asset>;
    remove(id: string): Promise<void>;
}
