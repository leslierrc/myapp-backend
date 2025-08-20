import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Office } from './entities/office.entity';

// offices.service.ts

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(Office)
    private officesRepository: Repository<Office>,
  ) {}

  // 🔽 Añade este método
  async findAll(): Promise<Office[]> {
    return this.officesRepository.find();
  }

  async findOne(id: string): Promise<Office> {
    const office = await this.officesRepository.findOneBy({ id });
    if (!office) {
      throw new NotFoundException(`Office with ID "${id}" not found`);
    }
    return office;
  }
}