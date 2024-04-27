import { Injectable } from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import { Clinic, Prisma } from '@prisma/client';

@Injectable()
export class ClinicsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ClinicCreateInput): Promise<Clinic> {
    return this.prisma.clinic.create({ data });
  }

  async findAll() {
    return this.prisma.clinic.findMany({
      select: {
        id: true,
        inn: true,
        address: true,
        name: true,
        latitude: true,
        longitude: true,
        needBloods: true
      }
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
}