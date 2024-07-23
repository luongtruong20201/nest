import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { generateHash, validateHash } from 'src/shared/utils/hash-string';
import { RegisterReqBody } from './dtos/auth-request.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from 'src/constant/auth.constant';
import { EEnv } from 'src/constant/env.constant';
import { User } from 'src/entities/user.enttiy';
import { EUserRole } from 'src/constant/user.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: User) {
    const payload: IJwtPayload = {
      userId: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

  async register(data: RegisterReqBody) {
    const userExistWithEmail = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (userExistWithEmail) {
      throw new BadRequestException('USER_EXIST_WITH_EMAIL');
    }

    const password = await generateHash(data.password);
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      password,
      role: EUserRole.USER,
    });

    await user.save();
  }

  async signAccessToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload);
  }

  async signRefreshToken(payload: IJwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>(EEnv.JWT_REFRESH_TOKEN_SECRET),
      expiresIn: `${this.configService.get<number>(EEnv.JWT_REFRESH_TOKEN_EXPIRE_IN)}s`,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('USER_NOT_FOUND');
    }

    const isMatch = await validateHash(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('EMAIL_OR_PASSWORD_INCORRECT');
    }

    return user;
  }
}
