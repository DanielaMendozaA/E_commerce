import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @ManyToOne(() => Role)
    @JoinColumn({name: 'roleId'})
    role: Role;

    @Column({ name: 'roleId' }) 
    roleId: string;
}