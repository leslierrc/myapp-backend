import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './entities/asset.entity';
import { ActivityLogsService } from 'src/activity-logs/activity-logs.service';
import { Office } from 'src/offices/entities/office.entity';

@Injectable()
export class AssetsService {
 constructor(
    @InjectRepository(Asset)
    private assetsRepository: Repository<Asset>,
    @InjectRepository(Office)
    private officesRepository: Repository<Office>,
    private activityLogsService: ActivityLogsService, // ⬅️ Inyectado
  ) {}
  // Todos los activos (global)
 findAll(): Promise<Asset[]> {
  return this.assetsRepository
    .createQueryBuilder('assets')
    .leftJoinAndSelect('assets.office', 'office')
    .getMany();
}

async searchGlobal(term: string): Promise<Asset[]> {
  return this.assetsRepository
    .createQueryBuilder('assets')
    .leftJoinAndSelect('assets.office', 'office') // ⬅️ Carga el objeto office
    .where(
      '(assets.name LIKE :term OR ' +
      'assets.serial LIKE :term OR ' +
      'assets.inventory LIKE :term OR ' +
      'assets.status LIKE :term OR ' +
      'office.name LIKE :term)', // ⬅️ Opcional: también busca por nombre de oficina
      { term: `%${term}%` }
    )
    .getMany();
}
async findAllByOffice(officeId: string): Promise<Asset[]> {
  
  const assets = await this.assetsRepository
    .createQueryBuilder('assets')
    .leftJoinAndSelect('assets.office', 'office')
    .where('assets.officeId = :officeId', { officeId })
    .getMany();

  return assets;
}
async searchByOffice(officeId: string, term: string): Promise<Asset[]> {
  return this.assetsRepository
    .createQueryBuilder('assets')
    .leftJoinAndSelect('assets.office', 'office')
    .where('assets.officeId = :officeId', { officeId })
    .andWhere(
      '(assets.name LIKE :term OR ' +
      'assets.serial LIKE :term OR ' +
      'assets.inventory LIKE :term OR ' +
      'assets.status LIKE :term OR ' +
      'office.name LIKE :term)',
      { term: `%${term}%` }
    )
    .getMany();
}

  // Crear
  async create(assetData: Partial<Asset>): Promise<Asset> {
    const assets = this.assetsRepository.create(assetData);
    const office = await this.officesRepository.findOneBy({ id: assets.officeId });
    await this.activityLogsService.log('create', assets.name, undefined, office?.name);
    return await this.assetsRepository.save(assets);
  }
 
// En el servicio
async findOne(id: string): Promise<Asset> {
  const assets = await this.assetsRepository.findOneBy({ id });
  if (!assets) {
    throw new NotFoundException(`Asset with ID "${id}" not found`);
  }
  return assets;
}

 
// src/assets/assets.service.ts

async update(id: string, assetData: Partial<Asset>): Promise<Asset> {
  const oldAsset = await this.findOne(id);
  const oldOfficeId = oldAsset.officeId;
  const newOfficeId = assetData.officeId;

  // Guardar cambios
  const updatedAsset = await this.assetsRepository.save({ ...oldAsset, ...assetData });

  // Detectar si se movió de oficina
  if (newOfficeId && oldOfficeId !== newOfficeId) {
    const oldOffice = await this.officesRepository.findOneBy({ id: oldOfficeId });
    const newOffice = await this.officesRepository.findOneBy({ id: newOfficeId });

    await this.activityLogsService.log(
      'move',
      updatedAsset.name,
      oldOffice?.name,
      newOffice?.name,
    );
  } else if (oldAsset.name !== updatedAsset.name || oldAsset.createdAt !== updatedAsset.createdAt || oldAsset.inventory !== updatedAsset.inventory || oldAsset.office !== updatedAsset.office || oldAsset.officeId !== updatedAsset.officeId || oldAsset.serial !== updatedAsset.serial || oldAsset.status !== updatedAsset.status) {
    await this.activityLogsService.log('update', updatedAsset.name);
  }

  return updatedAsset;
}

  async remove(id: string): Promise<void> {
    const asset = await this.findOne(id);
    const office = await this.officesRepository.findOneBy({ id: asset.officeId });

    await this.assetsRepository.delete(id);

    // 🔔 Registra eliminación
    await this.activityLogsService.log('delete', asset.name, office?.name);
  }

}