import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InMemoryEventBus } from './event-bus/in-memory-event-bus';
import { OutboxEvent } from './outbox/outbox.entity';
import { OutboxRepository } from './outbox/outbox.repository';
import { OutboxProcessor } from './outbox/outbox.processor';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([OutboxEvent])],
  providers: [InMemoryEventBus, OutboxRepository, OutboxProcessor],
  exports: [InMemoryEventBus, OutboxRepository, OutboxProcessor],
})
export class CoreModule {}
