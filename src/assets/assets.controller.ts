import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { Asset } from './entities/asset.entity';

@Controller('api/assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  // 🔍 Búsqueda global: todos los activos que coincidan
  @Get()
  async searchGlobal(@Query('search') term?: string): Promise<Asset[]> {
    if (!term) {
      return this.assetsService.findAll(); // Todos los activos
    }
    return this.assetsService.searchGlobal(term);
  }

  @Get('office/:officeId')
async findByOffice(@Param('officeId') officeId: string): Promise<Asset[]> {
  return this.assetsService.findAllByOffice(officeId);
}

  // 🏢🔍 Búsqueda en una oficina
  @Get('office/:officeId/search')
  searchByOffice(
    @Param('officeId') officeId: string,
    @Query('q') term: string,
  ) {
    if (!term) return this.assetsService.findAllByOffice(officeId);
    return this.assetsService.searchByOffice(officeId, term);
  }

  // ➕ Crear un activo (con officeId)
  @Post()
  create(@Body() assetData: Partial<Asset>): Promise<Asset> {
    return this.assetsService.create(assetData);
  }

  // ✏️ Actualizar
  @Put(':id')
  update(@Param('id') id: string, @Body() assetData: Partial<Asset>) {
    return this.assetsService.update(id, assetData);
  }

  // ❌ Eliminar
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetsService.remove(id);
  }
}