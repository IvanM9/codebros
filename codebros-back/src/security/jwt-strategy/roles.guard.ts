/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {InfoUserInterface} from "../jwt-strategy/info-user.interface";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as InfoUserInterface;
    let hasRole= false;

    for (const role of roles) {
      if (user.role === role) {
        hasRole = true;
        break;
      }
    }
    return user && hasRole;
  }
}