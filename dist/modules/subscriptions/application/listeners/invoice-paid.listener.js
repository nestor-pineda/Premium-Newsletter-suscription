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
exports.InvoicePaidListener = void 0;
const common_1 = require("@nestjs/common");
const in_memory_event_bus_1 = require("../../../../core/event-bus/in-memory-event-bus");
const subscription_repository_1 = require("../../infrastructure/subscription.repository");
const outbox_repository_1 = require("../../../../core/outbox/outbox.repository");
let InvoicePaidListener = class InvoicePaidListener {
    eventBus;
    subscriptionRepo;
    outboxRepo;
    constructor(eventBus, subscriptionRepo, outboxRepo) {
        this.eventBus = eventBus;
        this.subscriptionRepo = subscriptionRepo;
        this.outboxRepo = outboxRepo;
    }
    onModuleInit() {
        this.eventBus.register(this);
    }
    supports(event) {
        return event.name === 'InvoicePaid';
    }
    async handle(event) {
        const { subscriptionId, paidAt } = event.payload;
        console.log(`[Subscriptions] Handling InvoicePaid for sub ${subscriptionId}`);
        const subscription = await this.subscriptionRepo.findById(subscriptionId);
        if (!subscription) {
            console.error(`[Subscriptions] Subscription ${subscriptionId} not found`);
            return;
        }
        const startDate = new Date(paidAt);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 30);
        await this.subscriptionRepo.updateStatus(subscriptionId, 'ACTIVE', startDate, endDate);
        await this.outboxRepo.save({
            type: 'SubscriptionActivated',
            payload: {
                subscriptionId: subscription.id,
                userId: subscription.userId,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
            },
            aggregateId: subscription.id,
            aggregateType: 'Subscription',
            occurredAt: new Date().toISOString(),
        });
        console.log(`[Subscriptions] Activated subscription ${subscription.id}`);
    }
};
exports.InvoicePaidListener = InvoicePaidListener;
exports.InvoicePaidListener = InvoicePaidListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_event_bus_1.InMemoryEventBus,
        subscription_repository_1.SubscriptionRepository,
        outbox_repository_1.OutboxRepository])
], InvoicePaidListener);
//# sourceMappingURL=invoice-paid.listener.js.map