import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../domain/entities/plan.entity';

@Injectable()
export class PlanRepository {
  constructor(
    @InjectRepository(Plan)
    private readonly repo: Repository<Plan>,
  ) {}

  async findByName(name: string): Promise<Plan | null> {
    return this.repo.findOne({ where: { name } });
  }

  async createDefaultPlan(): Promise<Plan> {
    const existing = await this.findByName('Premium Monthly');
    if (existing) return existing;

    const plan = this.repo.create({
      name: 'Premium Monthly',
      price: 29.99,
      durationInMonths: 1,
    });
    return this.repo.save(plan);
  }

  async findById(id: string): Promise<Plan | null> {
    return this.repo.findOne({ where: { id } });
  }
}
