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
exports.UserCreatedListener = void 0;
const common_1 = require("@nestjs/common");
const in_memory_event_bus_1 = require("../../../../core/event-bus/in-memory-event-bus");
const subscription_repository_1 = require("../../infrastructure/subscription.repository");
const plan_repository_1 = require("../../infrastructure/plan.repository");
const outbox_repository_1 = require("../../../../core/outbox/outbox.repository");
let UserCreatedListener = class UserCreatedListener {
    eventBus;
    subscriptionRepo;
    planRepo;
    outboxRepo;
    constructor(eventBus, subscriptionRepo, planRepo, outboxRepo) {
        this.eventBus = eventBus;
        this.subscriptionRepo = subscriptionRepo;
        this.planRepo = planRepo;
        this.outboxRepo = outboxRepo;
    }
    onModuleInit() {
        this.eventBus.register(this);
    }
    supports(event) {
        return event.name === 'UserCreated';
    }
    async handle(event) {
        const { userId, email } = event.payload;
        console.log(`[Subscriptions] Handling UserCreated for ${email}`);
        const plan = await this.planRepo.createDefaultPlan();
        const subscription = await this.subscriptionRepo.create(userId, plan.id);
        await this.outboxRepo.save({
            type: 'SubscriptionCreated',
            payload: {
                subscriptionId: subscription.id,
                userId: userId,
                planId: plan.id,
                price: plan.price,
            },
            aggregateId: subscription.id,
            aggregateType: 'Subscription',
            occurredAt: new Date().toISOString(),
        });
        console.log(`[Subscriptions] Created pending subscription ${subscription.id}`);
    }
};
exports.UserCreatedListener = UserCreatedListener;
exports.UserCreatedListener = UserCreatedListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_event_bus_1.InMemoryEventBus,
        subscription_repository_1.SubscriptionRepository,
        plan_repository_1.PlanRepository,
        outbox_repository_1.OutboxRepository])
], UserCreatedListener);
//# sourceMappingURL=user-created.listener.js.map