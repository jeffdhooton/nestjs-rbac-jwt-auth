import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  /**
   * Find all roles
   */
  async findAll(): Promise<Role[] | undefined> {
    return await this.rolesRepository.find();
  }

  /**
   * Find a single role based on name
   */
  async findByName(name: string): Promise<Role | undefined> {
    return await this.rolesRepository.findOne({ name });
  }

  /**
   * Find a single role based on id
   */
  async findById(id: number): Promise<Role | undefined> {
    return await this.rolesRepository.findOne(id);
  }

  /**
   * Delete a single role based on id
   */
  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
