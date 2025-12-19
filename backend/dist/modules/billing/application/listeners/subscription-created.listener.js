"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionCreatedListener = void 0;
const common_1 = require("@nestjs/common");
const in_memory_event_bus_1 = require("../../../../core/event-bus/in-memory-event-bus");
const invoice_repository_1 = require("../../infrastructure/invoice.repository");
const payment_gateway_1 = require("../services/payment.gateway");
const outbox_repository_1 = require("../../../../core/outbox/outbox.repository");
let SubscriptionCreatedListener = class SubscriptionCreatedListener {
    eventBus;
    invoiceRepo;
    paymentGateway;
    outboxRepo;
    constructor(eventBus, invoiceRepo, paymentGateway, outboxRepo) {
        this.eventBus = eventBus;
        this.invoiceRepo = invoiceRepo;
        this.paymentGateway = paymentGateway;
        this.outboxRepo = outboxRepo;
    }
    onModuleInit() {
        this.eventBus.register(this);
    }
    supports(event) {
        return event.name === 'SubscriptionCreated';
    }
    async handle(event) {
        const { subscriptionId, userId, price } = event.payload;
        console.log(`[Billing] Handling SubscriptionCreated for sub ${subscriptionId}`);
        const invoice = await this.invoiceRepo.create(userId, subscriptionId, price);
        console.log(`[Billing] Attempting payment for invoice ${invoice.id}...`);
        const paymentResult = await this.paymentGateway.charge(price, 'USD', 'tok_visa');
        await this.invoiceRepo.addAttempt(invoice.id, paymentResult.success, paymentResult.transactionId, paymentResult.error);
        if (paymentResult.success) {
            const paidAt = new Date();
            await this.invoiceRepo.updateStatus(invoice.id, 'PAID', paidAt);
            console.log(`[Billing] Payment Successful for invoice ${invoice.id}`);
            await this.outboxRepo.save({
                type: 'InvoicePaid',
                payload: {
                    invoiceId: invoice.id,
                    subscriptionId: subscriptionId,
                    userId: userId,
                    amount: price,
                    paidAt: paidAt.toISOString(),
                    transactionId: paymentResult.transactionId,
                },
                aggregateId: invoice.id,
                aggregateType: 'Invoice',
                occurredAt: new Date().toISOString(),
            });
        }
        else {
            await this.invoiceRepo.updateStatus(invoice.id, 'FAILED');
            console.warn(`[Billing] Payment Failed for invoice ${invoice.id}: ${paymentResult.error}`);
            await this.outboxRepo.save({
                type: 'PaymentFailed',
                payload: {
                    invoiceId: invoice.id,
                    subscriptionId: subscriptionId,
                    userId: userId,
                    amount: price,
                    reason: paymentResult.error,
                },
                aggregateId: invoice.id,
                aggregateType: 'Invoice',
                occurredAt: new Date().toISOString(),
            });
        }
    }
};
exports.SubscriptionCreatedListener = SubscriptionCreatedListener;
exports.SubscriptionCreatedListener = SubscriptionCreatedListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_event_bus_1.InMemoryEventBus,
        invoice_repository_1.InvoiceRepository,
        payment_gateway_1.PaymentGateway,
        outbox_repository_1.OutboxRepository])
], SubscriptionCreatedListener);
//# sourceMappingURL=subscription-created.listener.js.map