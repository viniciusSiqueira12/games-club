import { getRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Follower from '../../models/Follower';

interface Request {
  FkFollowerId: string;
  FkFollowingId: string;
}

class FollowUserService {
  public async execute({ FkFollowerId, FkFollowingId }: Request): Promise<Follower> {
    const followerRepository = getRepository(Follower);
  
    const isFollowers = await followerRepository.findOne({ 
         where: { FkFollowerId: FkFollowerId, FkFollowingId: FkFollowingId}
     });
 
    if(isFollowers) {
      await followerRepository.createQueryBuilder().delete().from(Follower).where("Id = :Id", { Id: isFollowers.Id })
      .execute(); 
      return null;
    }

    const follower = followerRepository.create({
      FkFollowerId,
      FkFollowingId,
    });

    await followerRepository.save(follower);

    return follower;
  }
}

export default FollowUserService;
