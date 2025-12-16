import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { CreateUserHandler } from '../../application/handlers/create-user.handler';
import { CreateUserCommand } from '../../application/commands/create-user.command';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserHandler: CreateUserHandler) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    const command = new CreateUserCommand(dto.email, dto.name);
    const user = await this.createUserHandler.execute(command);
    return {
      id: user.id,
      email: user.email,
      status: 'created',
    };
  }
}
