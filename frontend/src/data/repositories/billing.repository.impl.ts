import { IBillingRepository } from '../../domain/repositories/billing.repository';
import { Invoice } from '../../domain/entities/invoice.entity';
import api from '../sources/api';
import { InvoiceMapper } from '../mappers/invoice.mapper';

export class BillingRepositoryImpl implements IBillingRepository {
  async getInvoices(): Promise<Invoice[]> {
    const response = await api.get('/invoices');
    return response.data.map(InvoiceMapper.toDomain);
  }
}

