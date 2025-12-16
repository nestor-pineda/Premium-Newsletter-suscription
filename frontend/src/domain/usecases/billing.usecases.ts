import { IBillingRepository } from '../repositories/billing.repository';
import { Invoice } from '../entities/invoice.entity';

export class GetInvoicesUseCase {
  constructor(private billingRepository: IBillingRepository) {}

  execute(): Promise<Invoice[]> {
    return this.billingRepository.getInvoices();
  }
}

