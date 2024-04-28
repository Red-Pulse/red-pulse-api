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
import * as otpGenerator from 'otp-generator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @Post('register')
  async register(@Body() data: CreateUserDto): Promise<User> {
    const otp = otpGenerator.generate(6, {
      digits: true,
      specialChars: false,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
    });

    return this.usersService.registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      otp: otp,
      bloodType: {
        connect: {
          id: data.bloodTypeId,
        },
      },
    });
  }

  @Post('login')
  async login(
    @Body() { phone, otp }: { phone: string; otp: string },
  ): Promise<User | null> {
    const user = await this.usersService.loginUser(phone, otp);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
