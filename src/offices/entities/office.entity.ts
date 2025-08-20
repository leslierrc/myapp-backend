import { Asset } from 'src/assets/entities/asset.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('offices')
export class Office {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  // Relación inversa: una oficina tiene muchos assets
  @OneToMany(() => Asset, (asset) => asset.office)
  assets: Asset[];
}