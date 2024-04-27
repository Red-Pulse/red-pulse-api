import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodTypesService } from './blood-types.service';
import { BloodType } from '@prisma/client';
import { CreateBloodTypeDto } from './dto/create-blood-type.dto';

@Controller('blood-types')
export class BloodTypesController {
  constructor(private readonly bloodTypesService: BloodTypesService) {}

  @Post()
  create(@Body() data: CreateBloodTypeDto): Promise<BloodType> {
    return this.bloodTypesService.create(data);
  }

  @Get()
  findAll(): Promise<BloodType[]> {
    return this.bloodTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BloodType> {
    return this.bloodTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: BloodType): Promise<BloodType> {
    return this.bloodTypesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<BloodType> {
    return this.bloodTypesService.remove(+id);
  }
}