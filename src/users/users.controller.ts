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
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      photo: faker.image.avatar(),
      password: data.password,
      bloodType: {
        connect: {
          id: data.bloodTypeId,
        },
      },
    });
  }

  @Post('login')
  async login(
    @Body() { phone, password }: { phone: string; password: string },
  ): Promise<User | null> {
    const user = await this.usersService.loginUser(phone, password);

    console.log(phone, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  @Get(':id/joined-clinics')
  async findJoinedClinics(@Param('id') id: string) {
    const user = await this.usersService.joinedClinics(+id);

    return user.clinics;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.usersService.update(+id, {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      bloodType: {
        connect: {
          id: user.bloodTypeId,
        },
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
