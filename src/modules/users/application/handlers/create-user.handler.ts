import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../../infrastructure/user.repository';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';

@Injectable()
export class CreateUserHandler {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly outboxRepository: OutboxRepository,
  ) {}

  async execute(command: CreateUserCommand) {
    const existing = await this.userRepository.findByEmail(command.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    // NOTE: In a real production system, you'd wrap this in a database transaction
    // to ensure user creation and outbox event are atomic.
    // For this MVP, we proceed sequentially.

    // 1. Create User
    const user = await this.userRepository.create(command.email, command.name);

    // 2. Save Event to Outbox
    await this.outboxRepository.save({
      aggregateType: 'User',
      aggregateId: user.id,
      type: 'UserCreated',
      payload: {
        userId: user.id,
        email: user.email,
        name: user.name,
      },
      occurredAt: new Date().toISOString(),
    });

    return user;
  }
}
