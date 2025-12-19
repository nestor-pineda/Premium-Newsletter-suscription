import {
  Controller,
  Get,
  Patch,
  Delete,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from '../../application/services/subscriptions.service';

@Controller('subscriptions')
@UseGuards(AuthGuard('jwt'))
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('me')
  async getSubscription(@Request() req) {
    return this.subscriptionsService.getSubscription(req.user.id);
  }

  @Patch('me')
  async updatePlan(@Request() req, @Body('planId') planId: string) {
    return this.subscriptionsService.updatePlan(req.user.id, planId);
  }

  @Delete('me')
  async cancelSubscription(@Request() req) {
    return this.subscriptionsService.cancelSubscription(req.user.id);
  }

  @Post('me/reactivate')
  async reactivateSubscription(@Request() req) {
    return this.subscriptionsService.reactivateSubscription(req.user.id);
  }
}

