import { Module } from '@nestjs/common';
import { BloodTypesService } from './blood-types.service';
import { BloodTypesController } from './blood-types.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BloodTypesController],
  providers: [BloodTypesService],
  exports: [BloodTypesService]
})
export class BloodTypesModule {}
