import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../../infrastructure/user.repository';
import { OutboxRepository } from '../../../../core/outbox/outbox.repository';
export declare class CreateUserHandler {
    private readonly userRepository;
    private readonly outboxRepository;
    constructor(userRepository: UserRepository, outboxRepository: OutboxRepository);
    execute(command: CreateUserCommand): Promise<import("../../domain/entities/user.entity").User>;
}
