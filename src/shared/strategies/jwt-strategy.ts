import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IJwtPayload } from 'src/constant/auth.constant';
import { ConfigService } from '@nestjs/config';
import { EEnv } from 'src/constant/env.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(EEnv.JWT_ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    return payload;
  }
}
