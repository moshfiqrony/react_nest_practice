import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username, password);
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async login(user: any) {
    const payload = { username: user.data.username, sub: user.data.id };
    const token = await this.jwtService.signAsync(payload);
    const res = await this.userService.saveToken(token.toString(), user.data);
    if (res.ok) {
      return {
        ok: true,
        data: {
          access_token: token,
        },
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  async logout(user: any){
    const res = await this.userService.removeToken(user);
    if(res.ok){
      return({
        ok: true,
        data: 'User logged out'
      })
    }
  }
}
