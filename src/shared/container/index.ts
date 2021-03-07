import { container } from 'tsyringe';

import '../infra/providers';
import './providers';

import IUserRepository from '@domain/interfaces/repositories/IUserRepository';
import UserRepository from '../infra/repositories/UserRepository';

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository,
)