export interface PaymentResult {
    success: boolean;
    transactionId?: string;
    error?: string;
}
export declare class PaymentGateway {
    charge(amount: number, currency: string, sourceId: string): Promise<PaymentResult>;
}
