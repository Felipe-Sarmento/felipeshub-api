import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService
  ) { }

  async validate(token: string): Promise<boolean> {
    try {
      await this.jwtService.verify(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async generate(email: string, id: string): Promise<string> {
    return this.jwtService.sign({
      email,
      id
    })
  }
}
