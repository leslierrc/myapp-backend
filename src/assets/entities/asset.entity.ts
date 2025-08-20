import { Office } from 'src/offices/entities/office.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  serial: string;

  @Column()
  inventory: string;

  @Column()
  status: string;
@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
createdAt: Date;
  // 🔥 CORRIGE EL NOMBRE DE LA COLUMNA
  @Column({ name: 'officeld' })
  officeId: string;

  @ManyToOne(() => Office, office => office.assets)
  @JoinColumn({ name: 'officeld' }) // ⬅️ Asegúrate de que coincida
  office: Office;
}