import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EAuthGuard } from 'src/constant/auth.constant';

@Injectable()
export class LocalAuthGuard extends AuthGuard(EAuthGuard.LOCAL) {}
