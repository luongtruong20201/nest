import { Injectable } from '@nestjs/common';
import { ETableName } from 'src/constant/database.constant';
import { User } from 'src/entities/user.enttiy';
import { BaseRepository } from 'src/shared/base/base.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  protected readonly alias = ETableName.USERS;

  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
