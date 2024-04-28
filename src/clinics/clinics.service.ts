import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Clinic, Prisma } from '@prisma/client';

@Injectable()
export class ClinicsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.clinic.findMany({
      select: {
        id: true,
        inn: true,
        address: true,
        latitude: true,
        longitude: true,
        name: true,
        needBloods: true,
        users: true,
      },
    });
  }

  async joinedUsers(clinicId: number) {
    return this.prisma.clinic.findUnique({
      where: { id: clinicId },
      select: {
        users: {
          select: {
            id: true,
            phone: true,
            bloodType: true,
            firstName: true,
            lastName: true,
            photo: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Clinic | null> {
    return this.prisma.clinic.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ClinicUpdateInput): Promise<Clinic> {
    return this.prisma.clinic.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Clinic> {
    return this.prisma.clinic.delete({ where: { id } });
  }

  async register(data: Prisma.ClinicCreateInput) {
    return this.prisma.clinic.create({
      data,
      select: {
        id: true,
        inn: true,
        needBloods: true,
        latitude: true,
        longitude: true,
        name: true,
        address: true,
      },
    });
  }

  async login(inn: number, password: string): Promise<Clinic | null> {
    return this.prisma.clinic.findFirst({ where: { inn, password } });
  }
}
