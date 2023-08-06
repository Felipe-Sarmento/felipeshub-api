import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class UserPrismaService {

  constructor(
    private prisma: PrismaService
  ) { }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
  }

  async deleteUser(userId: string) {
    return this.prisma.user.delete({
      where: {
        id: userId
      }
    })
  }

  async updateUser(data: Prisma.UserUpdateInput, userId: string) {
    return this.prisma.user.update({
      data: {
        ...data
      },
      where: {
        id: userId
      }
    })
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
