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
var OutboxProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxProcessor = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const outbox_repository_1 = require("./outbox.repository");
const in_memory_event_bus_1 = require("../event-bus/in-memory-event-bus");
let OutboxProcessor = OutboxProcessor_1 = class OutboxProcessor {
    repo;
    bus;
    logger = new common_1.Logger(OutboxProcessor_1.name);
    constructor(repo, bus) {
        this.repo = repo;
        this.bus = bus;
    }
    async processPending() {
        const pendings = await this.repo.findPending(100);
        if (pendings.length > 0) {
            this.logger.debug(`Found ${pendings.length} pending events`);
        }
        for (const outboxEvent of pendings) {
            try {
                await this.repo.markProcessing(outboxEvent.id);
                await this.bus.publish({
                    name: outboxEvent.type,
                    payload: outboxEvent.payload,
                    occurredAt: outboxEvent.occurredAt,
                });
                await this.repo.markSent(outboxEvent.id);
                this.logger.debug(`Event ${outboxEvent.type} (id: ${outboxEvent.id}) processed successfully`);
            }
            catch (err) {
                this.logger.error(`Failed to process event ${outboxEvent.id}`, err);
                await this.repo.markFailed(outboxEvent.id);
            }
        }
    }
};
exports.OutboxProcessor = OutboxProcessor;
__decorate([
    (0, schedule_1.Cron)('*/10 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OutboxProcessor.prototype, "processPending", null);
exports.OutboxProcessor = OutboxProcessor = OutboxProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [outbox_repository_1.OutboxRepository,
        in_memory_event_bus_1.InMemoryEventBus])
], OutboxProcessor);
//# sourceMappingURL=outbox.processor.js.map