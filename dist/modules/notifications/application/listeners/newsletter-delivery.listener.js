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
exports.NewsletterDeliveryListener = void 0;
const common_1 = require("@nestjs/common");
const in_memory_event_bus_1 = require("../../../../core/event-bus/in-memory-event-bus");
const notification_service_1 = require("../services/notification.service");
let NewsletterDeliveryListener = class NewsletterDeliveryListener {
    eventBus;
    notificationService;
    constructor(eventBus, notificationService) {
        this.eventBus = eventBus;
        this.notificationService = notificationService;
    }
    onModuleInit() {
        this.eventBus.register(this);
    }
    supports(event) {
        return event.name === 'NewsletterDeliveryRequested';
    }
    async handle(event) {
        const { subscriberCount } = event.payload || { subscriberCount: 0 };
        const fakeSubscribers = Array(subscriberCount).fill('user-id');
        await this.notificationService.sendWeeklyNewsletter(fakeSubscribers);
    }
};
exports.NewsletterDeliveryListener = NewsletterDeliveryListener;
exports.NewsletterDeliveryListener = NewsletterDeliveryListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [in_memory_event_bus_1.InMemoryEventBus,
        notification_service_1.NotificationService])
], NewsletterDeliveryListener);
//# sourceMappingURL=newsletter-delivery.listener.js.map