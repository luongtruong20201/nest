import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/constant/auth.constant';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const AuthUser = () =>
  createParamDecorator((_: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    return req.user;
  })();
