"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const asset_entity_1 = require("./entities/asset.entity");
const activity_logs_service_1 = require("../activity-logs/activity-logs.service");
const office_entity_1 = require("../offices/entities/office.entity");
let AssetsService = class AssetsService {
    assetsRepository;
    officesRepository;
    activityLogsService;
    constructor(assetsRepository, officesRepository, activityLogsService) {
        this.assetsRepository = assetsRepository;
        this.officesRepository = officesRepository;
        this.activityLogsService = activityLogsService;
    }
    findAll() {
        return this.assetsRepository
            .createQueryBuilder('assets')
            .leftJoinAndSelect('assets.office', 'office')
            .getMany();
    }
    async searchGlobal(term) {
        return this.assetsRepository
            .createQueryBuilder('assets')
            .leftJoinAndSelect('assets.office', 'office')
            .where('(assets.name LIKE :term OR ' +
            'assets.serial LIKE :term OR ' +
            'assets.inventory LIKE :term OR ' +
            'assets.status LIKE :term OR ' +
            'office.name LIKE :term)', { term: `%${term}%` })
            .getMany();
    }
    async findAllByOffice(officeId) {
        const assets = await this.assetsRepository
            .createQueryBuilder('assets')
            .leftJoinAndSelect('assets.office', 'office')
            .where('assets.officeId = :officeId', { officeId })
            .getMany();
        return assets;
    }
    async searchByOffice(officeId, term) {
        return this.assetsRepository
            .createQueryBuilder('assets')
            .leftJoinAndSelect('assets.office', 'office')
            .where('assets.officeId = :officeId', { officeId })
            .andWhere('(assets.name LIKE :term OR ' +
            'assets.serial LIKE :term OR ' +
            'assets.inventory LIKE :term OR ' +
            'assets.status LIKE :term OR ' +
            'office.name LIKE :term)', { term: `%${term}%` })
            .getMany();
    }
    async create(assetData) {
        const assets = this.assetsRepository.create(assetData);
        const office = await this.officesRepository.findOneBy({ id: assets.officeId });
        await this.activityLogsService.log('create', assets.name, undefined, office?.name);
        return await this.assetsRepository.save(assets);
    }
    async findOne(id) {
        const assets = await this.assetsRepository.findOneBy({ id });
        if (!assets) {
            throw new common_1.NotFoundException(`Asset with ID "${id}" not found`);
        }
        return assets;
    }
    async update(id, assetData) {
        const oldAsset = await this.findOne(id);
        const oldOfficeId = oldAsset.officeId;
        const newOfficeId = assetData.officeId;
        const updatedAsset = await this.assetsRepository.save({ ...oldAsset, ...assetData });
        if (newOfficeId && oldOfficeId !== newOfficeId) {
            const oldOffice = await this.officesRepository.findOneBy({ id: oldOfficeId });
            const newOffice = await this.officesRepository.findOneBy({ id: newOfficeId });
            await this.activityLogsService.log('move', updatedAsset.name, oldOffice?.name, newOffice?.name);
        }
        else if (oldAsset.name !== updatedAsset.name || oldAsset.createdAt !== updatedAsset.createdAt || oldAsset.inventory !== updatedAsset.inventory || oldAsset.office !== updatedAsset.office || oldAsset.officeId !== updatedAsset.officeId || oldAsset.serial !== updatedAsset.serial || oldAsset.status !== updatedAsset.status) {
            await this.activityLogsService.log('update', updatedAsset.name);
        }
        return updatedAsset;
    }
    async remove(id) {
        const asset = await this.findOne(id);
        const office = await this.officesRepository.findOneBy({ id: asset.officeId });
        await this.assetsRepository.delete(id);
        await this.activityLogsService.log('delete', asset.name, office?.name);
    }
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(asset_entity_1.Asset)),
    __param(1, (0, typeorm_1.InjectRepository)(office_entity_1.Office)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        activity_logs_service_1.ActivityLogsService])
], AssetsService);
//# sourceMappingURL=assets.service.js.map