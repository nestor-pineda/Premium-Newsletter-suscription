"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentGateway = void 0;
const common_1 = require("@nestjs/common");
let PaymentGateway = class PaymentGateway {
    async charge(amount, currency, sourceId) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const isSuccess = Math.random() < 0.8;
        if (isSuccess) {
            return {
                success: true,
                transactionId: `txn_${Math.random().toString(36).substring(7)}`,
            };
        }
        else {
            return {
                success: false,
                error: 'Insufficient funds or card declined',
            };
        }
    }
};
exports.PaymentGateway = PaymentGateway;
exports.PaymentGateway = PaymentGateway = __decorate([
    (0, common_1.Injectable)()
], PaymentGateway);
//# sourceMappingURL=payment.gateway.js.map