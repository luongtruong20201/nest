import { instanceToPlain } from 'class-transformer';
import { EUserRole } from 'src/constant/user.constant';
import { CustomBaseEntity } from 'src/shared/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class User extends CustomBaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: EUserRole;

  toJSON() {
    delete this.password;
    return instanceToPlain(this);
  }
}
