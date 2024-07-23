import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginReqBody, RegisterReqBody } from './dtos/auth-request.dto';
import { LocalAuthGuard } from 'src/shared/guards/local-auth.guard';
import { Public } from 'src/shared/decorators/auth.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginReqBody })
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  register(@Body() body: RegisterReqBody) {
    return this.authService.register(body);
  }
}
