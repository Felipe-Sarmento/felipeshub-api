import { Module } from '@nestjs/common';
import { UserPrismaService } from './services/user.prisma.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/shared/prisma/prisma.module';
import { HashingModule } from 'src/shared/hashing/hashing.module';
import { TokenModule } from 'src/shared/jwt/token.module';


@Module({
  imports: [
    PrismaModule,
    HashingModule,
    TokenModule
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    UserPrismaService
  ],
  exports: [
    UserPrismaService
  ]
})
export class UserModule {}
