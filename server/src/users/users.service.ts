import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        ...createUserInput,
        password: hashedPassword,
        telephones: {
          create: createUserInput.telephones,
        },
      },
      include: {
        telephones: true,
      },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        telephones: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        telephones: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

async findByEmail(email: string) {
  const user = await this.prisma.user.findUnique({
    where: { email },
    include: {
      telephones: true,
    },
  });

  if (!user) {
    throw new NotFoundException(`User with email ${email} not found`);
  }

  return user;
}

  async update(id: string, updateUserInput: UpdateUserInput) {
    await this.findOne(id); // Verifica se usuário existe

    const data: any = { ...updateUserInput };

    if (updateUserInput.password) {
      data.password = await bcrypt.hash(updateUserInput.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        telephones: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    
    return this.prisma.user.delete({
      where: { id },
      include: {
        telephones: true,
      },
    });
  }

  async searchByName(name: string) {
    if (!name || name.trim() === '') {
      return this.findAll();
    }

    return this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        telephones: true,
      },
    });
  }
}