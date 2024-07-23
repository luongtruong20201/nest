import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { AuthUser } from 'src/shared/decorators/auth.decorator';
import { IJwtPayload } from 'src/constant/auth.constant';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@AuthUser() user: IJwtPayload) {
    return this.usersService.getProfile(user.userId);
  }
}
