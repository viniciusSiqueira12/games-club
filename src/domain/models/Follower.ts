import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import User from './User';

@Entity('Follower')
class Follower {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
 
  @Column()
  FkFollowerId: string;

  @Column()
  FkFollowingId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'FkFollowerId'})
  Follower: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'FkFollowingId'})
  Following: User; 

  @CreateDateColumn()
  Created_at: Date;

  @UpdateDateColumn()
  Updated_at: Date;

}

export default Follower;
