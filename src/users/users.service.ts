import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { tr } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        bloodType: true,
        lastName: true,
        firstName: true,
        phone: true,
        photo: true,
        password: true,
      },
    });
  }

  async joinedClinics(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        clinics: {
          select: {
            id: true,
            inn: true,
            address: true,
            name: true,
            latitude: true,
            longitude: true,
            needBloods: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        clinics: { include: { needBloods: true, users: true } },
        bloodType: true,
      },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async registerUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
      include: { bloodType: true, clinics: true },
    });
  }

  async loginUser(phone: string, password: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        phone,
        password,
      },
      include: {
        bloodType: true,
        clinics: {
          include: {
            needBloods: true,
            users: true,
          },
        },
      },
    });
  }
}
