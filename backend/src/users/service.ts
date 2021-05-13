import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(email: string, username: string) {
    try {
      let user = await this.usersRepository.save({
        email: email,
        username: username,
      });

      return {
        ok: true,
        data: user,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.toString(),
      };
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find();
      return {
        ok: true,
        data: users,
      };
    } catch (error) {
      return {
        ok: true,
        data: error.toString(),
      };
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOne(id);
      return {
        ok: true,
        data: user,
      };
    } catch (error) {
      return {
        ok: true,
        data: error.toString(),
      };
    }
  }

  async remove(id: string) {
    try {
      await this.usersRepository.delete(id);
      return {
        ok: true,
        data: `${id} is deleted`,
      };
    } catch (error) {
      return {
        ok: true,
        data: error.toString(),
      };
    }
  }
}
