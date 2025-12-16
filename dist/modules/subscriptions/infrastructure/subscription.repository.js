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
exports.SubscriptionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const subscription_entity_1 = require("../domain/entities/subscription.entity");
let SubscriptionRepository = class SubscriptionRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(userId, planId) {
        const sub = this.repo.create({
            userId,
            planId,
            status: 'PENDING_PAYMENT',
        });
        return this.repo.save(sub);
    }
    async updateStatus(id, status, startDate, endDate) {
        const updateData = { status };
        if (startDate)
            updateData.startDate = startDate;
        if (endDate)
            updateData.endDate = endDate;
        await this.repo.update(id, updateData);
    }
    async findByUserId(userId) {
        return this.repo.findOne({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async findById(id) {
        return this.repo.findOne({ where: { id } });
    }
    async findExpiring(date) {
        return this.repo.find({
            where: {
                status: 'ACTIVE',
                endDate: (0, typeorm_1.LessThan)(date),
            },
            relations: ['plan'],
        });
    }
};
exports.SubscriptionRepository = SubscriptionRepository;
exports.SubscriptionRepository = SubscriptionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(subscription_entity_1.Subscription)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SubscriptionRepository);
//# sourceMappingURL=subscription.repository.js.map