import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async saveToken(token: string, user){
    
    let dbuser = await this.usersRepository.save({id: user.id, token: token})
    
    if(dbuser){
      return({
        ok: true,
        data: dbuser
      })
    }else{
      return({
        ok: false,
        error: 'no user'
      })
    }
  }

  async create(email: string, username: string, password: string) {
    const hashPass = bcrypt.hashSync(password, 10);
    try {
      let user = await this.usersRepository.save({
        email: email,
        username: username,
        password: hashPass,
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

  async findOne(username: string, password: string) {
    const hashPass = bcrypt.hashSync(password, 10);
    try {
      const user = await this.usersRepository.findOne({
        username: username,
      });
      
      if(user && bcrypt.compareSync(password, user.password)){
        return {
          ok: true,
          data: user,
        };
      }else{
        return null
      }
    } catch (error) {
      return {
        ok: false,
        data: error.toString(),
      };
    }
  }

  async findOneById(id: string) {
    try {
      const user = await this.usersRepository.findOne(id);
      delete user.password
      if (user) {
        return {
          ok: true,
          data: user,
        };
      } else {
        return {
          ok: false,
          error: 'Can not find the user',
        };
      }
    } catch (error) {
      return {
        ok: false,
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
        ok: false,
        data: error.toString(),
      };
    }
  }
}
