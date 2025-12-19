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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const subscription_repository_1 = require("../../infrastructure/subscription.repository");
const plan_repository_1 = require("../../infrastructure/plan.repository");
let SubscriptionsService = class SubscriptionsService {
    subscriptionRepository;
    planRepository;
    constructor(subscriptionRepository, planRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.planRepository = planRepository;
    }
    async getSubscription(userId) {
        return this.subscriptionRepository.findByUserId(userId);
    }
    async updatePlan(userId, planId) {
        let plan;
        if (planId === 'pro') {
            plan = await this.planRepository.findByName('Premium Monthly');
            if (!plan) {
                plan = await this.planRepository.createDefaultPlan();
            }
        }
        else {
            plan = await this.planRepository.findById(planId);
        }
        if (!plan) {
            throw new common_1.NotFoundException('Plan not found');
        }
        let subscription = await this.subscriptionRepository.findByUserId(userId);
        if (!subscription) {
            return this.subscriptionRepository.create(userId, plan.id);
        }
        return this.subscriptionRepository.create(userId, plan.id);
    }
    async cancelSubscription(userId) {
        const subscription = await this.subscriptionRepository.findByUserId(userId);
        if (subscription) {
            await this.subscriptionRepository.updateStatus(subscription.id, 'CANCELLED');
        }
    }
    async reactivateSubscription(userId) {
        const subscription = await this.subscriptionRepository.findByUserId(userId);
        if (subscription) {
            await this.subscriptionRepository.updateStatus(subscription.id, 'ACTIVE');
        }
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscription_repository_1.SubscriptionRepository,
        plan_repository_1.PlanRepository])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map