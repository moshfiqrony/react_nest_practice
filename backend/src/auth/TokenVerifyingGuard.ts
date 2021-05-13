import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/service';

@Injectable()
export class TokenVerifyingGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, headers } = context.switchToHttp().getRequest();
    
    const token = headers.authorization.split(' ')[1];
    const dbUser = await this.userService.findOneById(user.id);
    
    if(dbUser.ok && token === dbUser.data.token){
        return true
    }

    throw new UnauthorizedException();
  }
}
