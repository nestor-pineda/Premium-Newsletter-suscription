"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
let NotificationService = NotificationService_1 = class NotificationService {
    logger = new common_1.Logger(NotificationService_1.name);
    async sendWelcomeEmail(userId, subscriptionId) {
        this.logger.log(`[EMAIL] Sending Welcome Email to User ${userId} for Subscription ${subscriptionId}`);
    }
    async sendPaymentRetryWarning(userId, invoiceId, reason) {
        this.logger.warn(`[EMAIL] Sending Payment Failed Warning to User ${userId} for Invoice ${invoiceId}. Reason: ${reason}`);
    }
    async sendWeeklyNewsletter(subscriberIds) {
        this.logger.log(`[EMAIL] Sending Weekly Newsletter to ${subscriberIds.length} subscribers.`);
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
//# sourceMappingURL=notification.service.js.map