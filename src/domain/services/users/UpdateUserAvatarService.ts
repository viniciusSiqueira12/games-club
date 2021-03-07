import { getRepository } from "typeorm";
import User from "../../models/User"; 
import { inject, injectable} from 'tsyringe';
import IUserRepository from "@domain/interfaces/repositories/IUserRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFilename}: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await this.userRepository.findById(user_id);

    if(!user) {
      throw new Error('Only autenticated users can change avatar.');
    }

    if(user.Avatar) {
      await this.storageProvider.deleteFile(user.Avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.Avatar = filename;

    await usersRepository.save(user);
    return user;
  }
}

export default UpdateUserAvatarService;
