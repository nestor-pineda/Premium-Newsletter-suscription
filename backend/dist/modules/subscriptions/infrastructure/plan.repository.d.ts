import { Repository } from 'typeorm';
import { Plan } from '../domain/entities/plan.entity';
export declare class PlanRepository {
    private readonly repo;
    constructor(repo: Repository<Plan>);
    findByName(name: string): Promise<Plan | null>;
    createDefaultPlan(): Promise<Plan>;
    findById(id: string): Promise<Plan | null>;
}
