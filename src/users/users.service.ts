import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
// import { IUser } from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Find all users
   */
  async findAll(): Promise<User[] | undefined> {
    return await this.usersRepository.find();
  }

  /**
   * Find a single user based on email address
   *
   * @param email string
   */
  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email });
  }

  /**
   * Find a single user based on email address
   *
   * @param email string
   */
  async findById(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne(id);
  }

  /**
   * Create a user
   *
   * @param user CreateUserDto
   */
  async create(user: CreateUserDto): Promise<User | undefined> {
    user.roleId = 2;
    return await this.usersRepository.save(user);
  }

  /**
   * Updates a new user based on ID
   *
   * @param id number
   * @param newValue CreateUserDto
   */
  async update(id: number, newValue: CreateUserDto): Promise<User | undefined> {
    const user = await this.usersRepository.findOneOrFail(id);
    if (!user.id) {
      console.error('User does not exist.');
    }

    await this.usersRepository.update(id, newValue);
    return await this.usersRepository.findOne(id);
  }

  /**
   * Delete a single user based on email address

   * @param email string
   */
  async remove(email: string): Promise<void> {
    await this.usersRepository.delete({ email });
  }

  async register(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;
    // Check whether user already exists
    let user = await this.usersRepository.findOne({ email });

    // If a user is found for that email address, throw error
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    // Create user
    user = await this.usersRepository.create(userDto);

    // Return saving of user
    return await this.usersRepository.save(user);
  }
}
