import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, // 🔐 ใช้ hashed password
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    // const existing = await this.prisma.user.findUnique({
    //   where: { email: data.email },
    // });

    // if (existing) {
    //   throw new BadRequestException('Email already exists');
    // }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }
}
