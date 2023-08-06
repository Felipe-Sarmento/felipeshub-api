import { Body, Controller, Post, Req} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginRequestDTO, LoginResponseDTO } from '../model/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  async login(
    @Body() payload: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.authService.login(payload);
  }

  @Post('/valid')
  async valid(
    @Req() request): Promise<boolean> {
      const token = request.headers.authorization.split(' ')[1];

      return await this.authService.valid(token);
    }
}
