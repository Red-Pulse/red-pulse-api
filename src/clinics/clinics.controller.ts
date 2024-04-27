import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { Clinic } from '@prisma/client';
import { CreateClinicDto } from './dto/create-clinic.dto';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post()
  create(@Body() clinic: CreateClinicDto): Promise<Clinic> {
    return this.clinicsService.create({
      inn: clinic.inn,
      name: clinic.name,
      address: clinic.address,
      latitude: clinic.latitude,
      longitude: clinic.latitude,
      needBloods: {
        connect: clinic.needBloods.map((needBloodId) => ({ id: needBloodId }))
      }
    });
  }

  @Get()
  findAll() {
    return this.clinicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Clinic> {
    return this.clinicsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Clinic): Promise<Clinic> {
    return this.clinicsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Clinic> {
    return this.clinicsService.remove(+id);
  }
}