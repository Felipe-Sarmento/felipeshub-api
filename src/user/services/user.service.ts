import { Injectable, NotFoundException } from '@nestjs/common';
import { UserPrismaService } from './user.prisma.service';
import { UserCompleteDTO, UserDataDTO } from '../model/user.dto';
import { HashingService } from 'src/shared/hashing/bycript.service';

@Injectable()
export class UserService {

  constructor(
    private userPrisma: UserPrismaService,
    private hashingService: HashingService,
  ) { }

  async createUser({name, password, email}: UserDataDTO): Promise<UserCompleteDTO> {
    const userExists = await this.userPrisma.getUserByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const newPassword = await this.hashingService.hashPassword(password);

    return this.userPrisma.createUser({ email, password: newPassword, name });
  }

  async getUser(userId: string): Promise<UserCompleteDTO> {
    const user = await this.userPrisma.getUser(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  } 

  async deleteUser(userId: string): Promise<UserCompleteDTO> {
    const user = await this.getUser(userId);

    return this.userPrisma.deleteUser(userId);
  }

  async updateUser(data: UserDataDTO, userId: string): Promise<UserCompleteDTO> {
    const user = await this.getUser(userId);
    
    return this.userPrisma.updateUser(data, userId);
  }
}
