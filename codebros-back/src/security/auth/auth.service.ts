import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/security/auth/dtos/LoginDto';
import { PrismaService } from 'src/prisma.service';
import { compare } from 'bcrypt';
import { ENVIRONMENT } from 'src/constants/environment';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private db: PrismaService,
  ) {}

  async login(payload: LoginDto) {
    const user = await this.db.user
      .findUniqueOrThrow({
        where: { email: payload.email },
      })
      .catch(() => {
        throw new BadRequestException('Usuario no encontrado');
      });

    if (!(await compare(payload.password, user.password))) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    return {
      token: this.jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        {
          expiresIn: '12h',
          secret: ENVIRONMENT.JWT_SECRET_KEY,
        },
      ),
      role: user.role,
    };
  }
}
