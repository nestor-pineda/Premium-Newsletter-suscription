import { Invoice } from '../../domain/entities/invoice.entity';

export class InvoiceMapper {
  static toDomain(raw: any): Invoice {
    return {
      id: raw.id,
      amount: raw.amount,
      currency: raw.currency,
      status: raw.status,
      date: raw.created,
      pdfUrl: raw.pdf_url,
    };
  }
}

