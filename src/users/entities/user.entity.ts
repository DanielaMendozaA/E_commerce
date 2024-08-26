import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";



@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Unique(['email'])
    email: string;

    @Column()
    password: string;

    @Column()
    @Unique(['username'])
    username: string;

    @ManyToOne(() => Role)
    @JoinColumn({name: 'roleId'})
    role: Role;

    @Column({ name: 'roleId' }) 
    roleId: string;
}