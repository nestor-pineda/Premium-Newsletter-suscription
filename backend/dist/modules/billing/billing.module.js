"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const invoice_entity_1 = require("./domain/entities/invoice.entity");
const payment_attempt_entity_1 = require("./domain/entities/payment-attempt.entity");
const invoice_repository_1 = require("./infrastructure/invoice.repository");
const payment_gateway_1 = require("./application/services/payment.gateway");
const subscription_created_listener_1 = require("./application/listeners/subscription-created.listener");
let BillingModule = class BillingModule {
};
exports.BillingModule = BillingModule;
exports.BillingModule = BillingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([invoice_entity_1.Invoice, payment_attempt_entity_1.PaymentAttempt]),
        ],
        providers: [invoice_repository_1.InvoiceRepository, payment_gateway_1.PaymentGateway, subscription_created_listener_1.SubscriptionCreatedListener],
        exports: [invoice_repository_1.InvoiceRepository],
    })
], BillingModule);
//# sourceMappingURL=billing.module.js.map