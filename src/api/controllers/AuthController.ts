import { Request, Response} from 'express'; 
import AuthUserService from '@domain/services/users/AuthUserService';
import { container } from 'tsyringe';

export default class AuthController { 
    public async auth(req: Request, res: Response): Promise<Response> {
        try {
            const { Email, Password } = req.body;
            const authenticateUser = container.resolve(AuthUserService);
       
            const { user, token } = await authenticateUser.execute({
              Email, Password
            });
       
           delete user.Password;
            return res.json({ user, token });
         }
         catch(err) {
           return res.status(400).json({ error: err.messsage });
         }
    }
 
}