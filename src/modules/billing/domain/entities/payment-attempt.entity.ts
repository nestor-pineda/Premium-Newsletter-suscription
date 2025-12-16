import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity('payment_attempts')
export class PaymentAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceId: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.attempts)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @Column()
  success: boolean;

  @Column({ nullable: true })
  transactionId: string; // e.g. from Stripe

  @Column({ type: 'text', nullable: true })
  errorReason: string;

  @CreateDateColumn()
  createdAt: Date;
}
