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
var SubscriptionRenewalCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRenewalCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const subscription_repository_1 = require("../../infrastructure/subscription.repository");
const outbox_repository_1 = require("../../../../core/outbox/outbox.repository");
let SubscriptionRenewalCron = SubscriptionRenewalCron_1 = class SubscriptionRenewalCron {
    subRepo;
    outboxRepo;
    logger = new common_1.Logger(SubscriptionRenewalCron_1.name);
    constructor(subRepo, outboxRepo) {
        this.subRepo = subRepo;
        this.outboxRepo = outboxRepo;
    }
    async checkExpiringSubscriptions() {
        this.logger.log('Checking for expired subscriptions...');
        const now = new Date();
        const expiredSubs = await this.subRepo.findExpiring(now);
        for (const sub of expiredSubs) {
            this.logger.log(`Found expired subscription ${sub.id}. Triggering renewal...`);
            await this.outboxRepo.save({
                type: 'SubscriptionCreated',
                payload: {
                    subscriptionId: sub.id,
                    userId: sub.userId,
                    planId: sub.planId,
                    price: sub.plan.price,
                    isRenewal: true,
                },
                aggregateId: sub.id,
                aggregateType: 'Subscription',
                occurredAt: new Date().toISOString(),
            });
        }
    }
};
exports.SubscriptionRenewalCron = SubscriptionRenewalCron;
__decorate([
    (0, schedule_1.Cron)('0 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionRenewalCron.prototype, "checkExpiringSubscriptions", null);
exports.SubscriptionRenewalCron = SubscriptionRenewalCron = SubscriptionRenewalCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscription_repository_1.SubscriptionRepository,
        outbox_repository_1.OutboxRepository])
], SubscriptionRenewalCron);
//# sourceMappingURL=subscription-renewal.cron.js.map