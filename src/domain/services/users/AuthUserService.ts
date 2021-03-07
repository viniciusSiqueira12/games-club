import { getRepository } from 'typeorm';
import User from "@domain/models/User";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable} from 'tsyringe';
import IUserRepository from '@domain/interfaces/repositories/IUserRepository';
import IHashProvider from '@shared/infra/providers/HashProvider/models/IHashProvider';

interface Request {
  Email: string;
  Password: string;
}

interface Response {
  user: User,
  token: string,
}

@injectable()
class AuthUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  public async execute({Email, Password}: Request) : Promise<Response> {

    console.log(Email,Password);

    Email.toLocaleLowerCase();

    const user = await this.userRepository.findByEmail(Email);

    if(!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(Password, user.Password);

    if(!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }


    const { secret, expiresIn } = auth.jwt;
    const token = sign({ }, secret, {
      subject: user.Id,
      expiresIn: expiresIn,
    });

    return {
      user,
      token
    }
  }
}

export default AuthUserService;
