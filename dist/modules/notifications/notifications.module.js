"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./application/services/notification.service");
const invoice_paid_listener_1 = require("./application/listeners/invoice-paid.listener");
const payment_failed_listener_1 = require("./application/listeners/payment-failed.listener");
const newsletter_delivery_listener_1 = require("./application/listeners/newsletter-delivery.listener");
const newsletter_cron_1 = require("./application/cron/newsletter.cron");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [
            notification_service_1.NotificationService,
            invoice_paid_listener_1.InvoicePaidListener,
            payment_failed_listener_1.PaymentFailedListener,
            newsletter_delivery_listener_1.NewsletterDeliveryListener,
            newsletter_cron_1.NewsletterCron,
        ],
        exports: [],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map