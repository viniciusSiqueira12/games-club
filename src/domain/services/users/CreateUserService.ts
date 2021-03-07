import User from "../../models/User";
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError'; 
import { inject, injectable} from 'tsyringe';
import IUserRepository from '@domain/interfaces/repositories/IUserRepository';
import IHashProvider from '@shared/infra/providers/HashProvider/models/IHashProvider';

interface Request {
  Name: string;
  Email: string;
  Password: string;
  Username: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}
  public async execute({ Name, Email, Password, Username}: Request): Promise<User> {
 
    Username.toLocaleLowerCase();
    Email.toLocaleLowerCase();

    const checkUserExist = await this.userRepository.userExist(Email, Username);
    
    if(checkUserExist) {
      throw new AppError('Email/Username already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(Password);
    const user = await this.userRepository.create({
      Name,
      Email,
      Password : hashedPassword,
      Username
    });

    return user;
  }
}

export default CreateUserService;
