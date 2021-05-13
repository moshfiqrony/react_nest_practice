import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;
  
  @Column({})
  password: string;
  
  @Column({default: '', nullable: true})
  token: string

  @Column({ default: true })
  isActive: boolean;
}