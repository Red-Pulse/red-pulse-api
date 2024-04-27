import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BloodType, Prisma } from '@prisma/client';
import { CreateBloodTypeDto } from './dto/create-blood-type.dto';

@Injectable()
export class BloodTypesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateBloodTypeDto): Promise<BloodType> {
    return this.prisma.bloodType.create({ data });
  }

  async findAll(): Promise<BloodType[]> {
    return this.prisma.bloodType.findMany();
  }

  async findOne(id: number): Promise<BloodType | null> {
    return this.prisma.bloodType.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.BloodTypeUpdateInput): Promise<BloodType> {
    return this.prisma.bloodType.update({ where: { id }, data });
  }

  async remove(id: number): Promise<BloodType> {
    return this.prisma.bloodType.delete({ where: { id } });
  }
}