export enum EAuthGuard {
  JWT = 'jwt',
  LOCAL = 'local',
}

export interface IJwtPayload {
  userId: number;
}

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
