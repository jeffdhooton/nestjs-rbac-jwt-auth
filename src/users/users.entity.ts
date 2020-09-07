import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToOne,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';
import { Role } from 'src/roles/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  name?: string;

  @ManyToOne(
    type => Role,
    role => role.users,
    { eager: true },
  )
  role: Role;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject(): ResponseUserDto {
    const { id, name, email } = this;
    const responseObject: ResponseUserDto = {
      id,
      name,
      email,
    };

    return responseObject;
  }
}
