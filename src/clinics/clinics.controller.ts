import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { Clinic } from '@prisma/client';
import { CreateClinicDto } from './dto/create-clinic.dto';

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Post('/join')
  makeDonation(
    @Body() data: { clinicId: number; userId: number },
  ): Promise<Clinic> {
    return this.clinicsService.update(data.clinicId, {
      users: {
        connect: {
          id: data.userId,
        },
      },
    });
  }

  @Post('/disconnect')
  disconnectDonation(
    @Body() data: { clinicId: number; userId: number },
  ): Promise<Clinic> {
    return this.clinicsService.update(data.clinicId, {
      users: {
        disconnect: {
          id: data.userId,
        },
      },
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

  @Post('register')
  async registerClinic(@Body() clinic: CreateClinicDto): Promise<Clinic> {
    return this.clinicsService.register({
      inn: clinic.inn,
      name: clinic.name,
      latitude: clinic.latitude,
      longitude: clinic.longitude,
      address: clinic.address,
      password: clinic.password,
      needBloods: {
        connect: clinic.needBloods.map((needBloodId) => ({ id: needBloodId })),
      },
    });
  }

  @Post('login')
  async loginClinic(
    @Body() { inn, password }: { inn: number; password: string },
  ): Promise<Clinic | null> {
    const clinic = await this.clinicsService.login(inn, password);

    if (!clinic) {
      throw new UnauthorizedException();
    }

    return clinic;
  }
}
