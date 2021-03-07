import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';

@Entity('Community')
class Community {
  @PrimaryGeneratedColumn('uuid')
  Id: string;
 
  @Column()
  Name: string;

  @Column()
  Avatar: string;

  @CreateDateColumn()
  Created_at: Date;

  @UpdateDateColumn()
  Updated_at: Date;

}

export default Community;
