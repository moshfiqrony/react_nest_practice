import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/User';

let USERS: Array<User> = [];

@Injectable()
export class AppService {
  getAllUsers(): User[] {
    return USERS;
  }

  getUser(id: number): User {
    const user = USERS.find(item => item.id == id);
    console.log(user);
    
    return user
  }

  createUser(email: string, username: string): User {
    let user: User = {
      id: USERS.length,
      email: email,
      username: username,
    };

    USERS.push(user);

    return user;
  }

  getAppName() {
    return {
      ok: false,
      data: 'react_nest_practice',
    };
  }
}
