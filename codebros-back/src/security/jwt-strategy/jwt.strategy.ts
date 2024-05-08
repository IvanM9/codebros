import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { Environment } from '@shared/constants/environment';
import { InfoUserInterface } from 'src/security/jwt-strategy/info-user.interface';
import { ENVIRONMENT } from 'src/constants/environment';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENVIRONMENT.JWT_SECRET_KEY,
    });
  }
  async validate(payload: InfoUserInterface) {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}
