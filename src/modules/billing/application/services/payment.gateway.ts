import { Injectable } from '@nestjs/common';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

@Injectable()
export class PaymentGateway {
  async charge(amount: number, currency: string, sourceId: string): Promise<PaymentResult> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Random success/failure (80% success rate for demo)
    const isSuccess = Math.random() < 0.8;

    if (isSuccess) {
      return {
        success: true,
        transactionId: `txn_${Math.random().toString(36).substring(7)}`,
      };
    } else {
      return {
        success: false,
        error: 'Insufficient funds or card declined',
      };
    }
  }
}

