import { Repository } from 'typeorm';
import { Office } from './entities/office.entity';
export declare class OfficesService {
    private officesRepository;
    constructor(officesRepository: Repository<Office>);
    findAll(): Promise<Office[]>;
    findOne(id: string): Promise<Office>;
}
