import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export type OutboxStatus = 'pending' | 'processing' | 'sent' | 'failed';

@Entity('outbox')
export class OutboxEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  aggregateType: string;

  @Column()
  aggregateId: string;

  @Column()
  type: string; // event name

  @Column('json')
  payload: any;

  @Column()
  occurredAt: string;

  @Column({
    type: 'varchar', // Use varchar for compatibility with simple string enums in postgres or sqlite
    default: 'pending',
  })
  status: OutboxStatus;

  @Column({ default: 0 })
  retries: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  processedAt: Date;
}

