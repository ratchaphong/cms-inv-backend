import { User as PrismaUser } from '@prisma/client';

export class UserEntity implements PrismaUser {
  name: string;
  id: number;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  gender: string | null;
  birthDate: Date | null;
  avatarUrl: string | null;
  address: string | null;
  role: string;
  createdAt: Date;

  constructor(partial: Partial<PrismaUser>) {
    Object.assign(this, partial);
  }
}
