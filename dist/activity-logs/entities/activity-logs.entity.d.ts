export declare class ActivityLog {
    id: string;
    action: 'create' | 'update' | 'delete' | 'move';
    assetName: string;
    fromOffice?: string;
    toOffice?: string;
    timestamp: Date;
}
