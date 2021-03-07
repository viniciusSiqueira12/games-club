import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import Follower from './Follower';

@Entity('User')
class User {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column()
  Password: string;

  @Column()
  Username: string;

  @Column()
  Avatar: string;

  @CreateDateColumn()
  Created_at: Date;

  @UpdateDateColumn()
  Updated_at: Date;

  @OneToMany(type => Follower, follow => follow.FkFollowerId)
  Followers: Follower[];

  @OneToMany(type => Follower, follow => follow.FkFollowingId)
  Follows: Follower[];
}

export default User;
