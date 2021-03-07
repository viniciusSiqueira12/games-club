import FollowUserService from '@domain/services/followers/FollowUserService';
import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Follower from '@domain/models/Follower'; 

export default class FollowerController { 
    public async toggle(req: Request, res: Response): Promise<Response> {
        try {
            const { FkFollowingId } = req.params;
            console.log(FkFollowingId);
            const followUserService = new FollowUserService();
       
            const follower = await followUserService.execute({
                FkFollowerId : req.user.id,
                FkFollowingId
            }); 
       
            return res.json(follower);
        }
        catch(err) {
            return res.status(400).json({ error: err.messsage });
        }
    };

    public async followings(req: Request, res: Response): Promise<Response> {
        try {
            const followersRepository = getRepository(Follower);
            
            const followings = await followersRepository.find({
                where: { FkFollowerId: req.user.id },
                relations: ['Following']
            });
    
            return res.status(200).json(followings);
        }
        catch(err) {
            return res.status(400).json({ error: err.messsage });
        }
    }
}