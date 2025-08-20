// offices.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { OfficesService } from './office.service'; // ⚠️ Asegúrate del nombre correcto

@Controller('api/offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}

  // 🔽 Lista todas las oficinas
  @Get()
  findAll() {
    return this.officesService.findAll();
  }

  // 🔽 Obtiene una oficina por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officesService.findOne(id);
  }
}