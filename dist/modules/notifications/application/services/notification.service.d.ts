export declare class NotificationService {
    private readonly logger;
    sendWelcomeEmail(userId: string, subscriptionId: string): Promise<void>;
    sendPaymentRetryWarning(userId: string, invoiceId: string, reason: string): Promise<void>;
    sendWeeklyNewsletter(subscriberIds: string[]): Promise<void>;
}
