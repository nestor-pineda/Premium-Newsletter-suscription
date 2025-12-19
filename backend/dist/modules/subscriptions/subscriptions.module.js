"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subscription_entity_1 = require("./domain/entities/subscription.entity");
const plan_entity_1 = require("./domain/entities/plan.entity");
const subscription_repository_1 = require("./infrastructure/subscription.repository");
const plan_repository_1 = require("./infrastructure/plan.repository");
const user_created_listener_1 = require("./application/listeners/user-created.listener");
const invoice_paid_listener_1 = require("./application/listeners/invoice-paid.listener");
const subscription_renewal_cron_1 = require("./application/cron/subscription-renewal.cron");
const subscriptions_controller_1 = require("./interface/rest/subscriptions.controller");
const subscriptions_service_1 = require("./application/services/subscriptions.service");
let SubscriptionsModule = class SubscriptionsModule {
};
exports.SubscriptionsModule = SubscriptionsModule;
exports.SubscriptionsModule = SubscriptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([subscription_entity_1.Subscription, plan_entity_1.Plan]),
        ],
        controllers: [subscriptions_controller_1.SubscriptionsController],
        providers: [
            subscription_repository_1.SubscriptionRepository,
            plan_repository_1.PlanRepository,
            user_created_listener_1.UserCreatedListener,
            invoice_paid_listener_1.InvoicePaidListener,
            subscription_renewal_cron_1.SubscriptionRenewalCron,
            subscriptions_service_1.SubscriptionsService,
        ],
        exports: [subscription_repository_1.SubscriptionRepository],
    })
], SubscriptionsModule);
//# sourceMappingURL=subscriptions.module.js.map