import { Invoice } from '../entities/invoice.entity';

export interface IBillingRepository {
  getInvoices(): Promise<Invoice[]>;
}

