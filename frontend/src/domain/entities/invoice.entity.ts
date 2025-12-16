export type InvoiceStatus = 'paid' | 'open' | 'void' | 'uncollectible' | 'failed';

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  date: string; // ISO date string
  pdfUrl?: string;
}

