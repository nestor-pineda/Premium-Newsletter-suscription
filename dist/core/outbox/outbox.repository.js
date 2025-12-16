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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutboxRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const outbox_entity_1 = require("./outbox.entity");
let OutboxRepository = class OutboxRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async save(event) {
        const newEvent = this.repo.create(event);
        return this.repo.save(newEvent);
    }
    async findPending(limit = 50) {
        return this.repo.find({
            where: { status: 'pending' },
            take: limit,
            order: { createdAt: 'ASC' },
        });
    }
    async markProcessing(id) {
        await this.repo.update(id, { status: 'processing' });
    }
    async markSent(id) {
        await this.repo.update(id, { status: 'sent', processedAt: new Date() });
    }
    async markFailed(id) {
        await this.repo.update(id, { status: 'failed' });
    }
};
exports.OutboxRepository = OutboxRepository;
exports.OutboxRepository = OutboxRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(outbox_entity_1.OutboxEvent)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], OutboxRepository);
//# sourceMappingURL=outbox.repository.js.map