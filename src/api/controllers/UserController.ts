import { Request, Response} from 'express';
import { getRepository } from 'typeorm'; 
import CreateUserService from '@domain/services/users/CreateUserService';
import User from '@domain/models/User';
import UpdateUserAvatarService from '@domain/services/users/UpdateUserAvatarService';
import { container } from 'tsyringe';

export default class UserController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { Name, Email, Password, Username } = req.body;
        
             const createUser = container.resolve(CreateUserService);
        
             const user = await createUser.execute({
               Name,
               Email,
               Password,
               Username
             });
        
             delete user.Password;
        
             return res.json(user);
        }
          catch(err) {
            return res.status(400).json({ error: err.messsage });
        }
    };

    public async verifyUsername(req: Request, res: Response): Promise<Response> {
        try { 
            const { Username } = req.params;
            const userRepository = getRepository(User);
    
            const user = await userRepository.findOne({
                 where: { Username }
            });
        
            const isUsernameUsed = user ? true : false;
            return res.status(200).json({ exist: isUsernameUsed });
        }
        catch(err) {
            return res.status(400).json({ error: err});
        }
    }


    public async updateAvatar(req: Request, res: Response): Promise<Response> {
        try {
            const updateAvatar = container.resolve(UpdateUserAvatarService);
            updateAvatar.execute({
              user_id: req.user.id,
              avatarFilename: req.file.filename,
            });
            return res.json({ok: true});
          }
          catch(err) {
            throw new Error('Erro update avatar');
          }
    }
}