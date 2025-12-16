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
var NewsletterCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const outbox_repository_1 = require("../../../../core/outbox/outbox.repository");
let NewsletterCron = NewsletterCron_1 = class NewsletterCron {
    outboxRepo;
    logger = new common_1.Logger(NewsletterCron_1.name);
    constructor(outboxRepo) {
        this.outboxRepo = outboxRepo;
    }
    async triggerNewsletter() {
        this.logger.log('Triggering Weekly Newsletter...');
        await this.outboxRepo.save({
            type: 'NewsletterDeliveryRequested',
            payload: {
                subscriberCount: 100,
            },
            aggregateId: 'system',
            aggregateType: 'System',
            occurredAt: new Date().toISOString(),
        });
    }
};
exports.NewsletterCron = NewsletterCron;
__decorate([
    (0, schedule_1.Cron)('0 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NewsletterCron.prototype, "triggerNewsletter", null);
exports.NewsletterCron = NewsletterCron = NewsletterCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [outbox_repository_1.OutboxRepository])
], NewsletterCron);
//# sourceMappingURL=newsletter.cron.js.map