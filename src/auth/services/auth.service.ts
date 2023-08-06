
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginRequestDTO, LoginResponseDTO } from '../model/login.dto';
import { HashingService } from 'src/shared/hashing/bycript.service';
import { UserPrismaService } from 'src/user/services/user.prisma.service';
import { TokenService } from 'src/shared/jwt/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userPrisma: UserPrismaService,
    private hashingService: HashingService,
    private tokenService: TokenService,
  ) {}

  async login({ email, password }: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userPrisma.getUserByEmail(email);

    if (!user) { 
      throw new UnauthorizedException('Invalid User');
    }

    const passwordMatch = await this.hashingService.comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid Password');
    }

    const token = await this.tokenService.generate(user.email, user.id);

    return { id: user.id, user, token};
  }

  async valid(token: string): Promise<boolean> {
    return this.tokenService.validate(token);
  }
}