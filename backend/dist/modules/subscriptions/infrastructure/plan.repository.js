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
exports.PlanRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const plan_entity_1 = require("../domain/entities/plan.entity");
let PlanRepository = class PlanRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findByName(name) {
        return this.repo.findOne({ where: { name } });
    }
    async createDefaultPlan() {
        const existing = await this.findByName('Premium Monthly');
        if (existing)
            return existing;
        const plan = this.repo.create({
            name: 'Premium Monthly',
            price: 29.99,
            durationInMonths: 1,
        });
        return this.repo.save(plan);
    }
    async findById(id) {
        return this.repo.findOne({ where: { id } });
    }
};
exports.PlanRepository = PlanRepository;
exports.PlanRepository = PlanRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(plan_entity_1.Plan)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PlanRepository);
//# sourceMappingURL=plan.repository.js.map