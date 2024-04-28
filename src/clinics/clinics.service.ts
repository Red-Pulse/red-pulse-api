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

  async findOne(id: number): Promise<Clinic | null> {
    return this.prisma.clinic.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ClinicUpdateInput): Promise<Clinic> {
    return this.prisma.clinic.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Clinic> {
    return this.prisma.clinic.delete({ where: { id } });
  }

  async register(data: Prisma.ClinicCreateInput): Promise<Clinic> {
    return this.prisma.clinic.create({ data });
  }

  async login(inn: number, password: string): Promise<Clinic | null> {
    return this.prisma.clinic.findFirst({ where: { inn, password } });
  }
}
