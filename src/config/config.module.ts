import { Module, Global } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import * as Joi from 'joi';
import { EEnv } from 'src/constant/env.constant';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        [EEnv.PORT]: Joi.number().required(),
        [EEnv.SWAGGER]: Joi.string().required(),
        [EEnv.DB_HOST]: Joi.string().required(),
        [EEnv.DB_PORT]: Joi.number().required(),
        [EEnv.DB_USERNAME]: Joi.string().required(),
        [EEnv.DB_PASSWORD]: Joi.string().required(),
        [EEnv.DB_DATABASE]: Joi.string().required(),
        [EEnv.JWT_ACCESS_TOKEN_SECRET]: Joi.string().required(),
        [EEnv.JWT_ACCESS_TOKEN_EXPIRE_IN]: Joi.number().required(),
        [EEnv.JWT_REFRESH_TOKEN_SECRET]: Joi.string().required(),
        [EEnv.JWT_REFRESH_TOKEN_EXPIRE_IN]: Joi.number().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
