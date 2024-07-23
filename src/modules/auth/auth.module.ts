import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/shared/strategies/local.strategy';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EEnv } from 'src/constant/env.constant';
import { JwtStrategy } from 'src/shared/strategies/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secret: configService.get<string>(EEnv.JWT_ACCESS_TOKEN_SECRET),
          signOptions: {
            expiresIn: `${configService.get<number>(EEnv.JWT_REFRESH_TOKEN_EXPIRE_IN)}s`,
          },
        };

        return options;
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
