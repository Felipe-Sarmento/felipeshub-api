import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { TokenModule } from 'src/shared/jwt/token.module';
import { HashingModule } from 'src/shared/hashing/hashing.module';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './controllers/auth.controller';


@Module({
  imports: [
    TokenModule,
    HashingModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthGuard,
  ],
})
export class AuthModule {}
