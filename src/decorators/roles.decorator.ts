import { SetMetadata } from '@nestjs/common';
import { Usertype } from 'src/constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Usertype[]) => SetMetadata(ROLES_KEY, roles);
