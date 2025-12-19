import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './interface/rest/users.controller';
import { CreateUserHandler } from './application/handlers/create-user.handler';
import { UserRepository } from './infrastructure/user.repository';
import { User } from './domain/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // CoreModule is Global, so OutboxRepository is available
  ],
  controllers: [UsersController],
  providers: [UserRepository, CreateUserHandler],
  exports: [UserRepository, CreateUserHandler],
})
export class UsersModule {}
