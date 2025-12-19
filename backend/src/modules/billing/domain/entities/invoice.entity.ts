import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PaymentAttempt } from './payment-attempt.entity';

export type InvoiceStatus = 'PENDING' | 'PAID' | 'FAILED';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  subscriptionId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string; // e.g., 'USD'

  @Column({
    type: 'varchar',
    default: 'PENDING',
  })
  status: InvoiceStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  paidAt: Date;

  @OneToMany(() => PaymentAttempt, (attempt) => attempt.invoice, {
    cascade: true,
  })
  attempts: PaymentAttempt[];
}
