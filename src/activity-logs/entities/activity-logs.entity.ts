import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('activity_logs')
export class ActivityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['create', 'update', 'delete', 'move'],
  })
  action: 'create' | 'update' | 'delete' | 'move';

  @Column()
  assetName: string;

  @Column({ nullable: true })
  fromOffice?: string;

  @Column({ nullable: true })
  toOffice?: string;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}