import { Office } from 'src/offices/entities/office.entity';
export declare class Asset {
    id: string;
    name: string;
    serial: string;
    inventory: string;
    status: string;
    createdAt: Date;
    officeId: string;
    office: Office;
}
