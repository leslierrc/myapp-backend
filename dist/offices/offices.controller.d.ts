import { OfficesService } from './office.service';
export declare class OfficesController {
    private readonly officesService;
    constructor(officesService: OfficesService);
    findAll(): Promise<import("./entities/office.entity").Office[]>;
    findOne(id: string): Promise<import("./entities/office.entity").Office>;
}
