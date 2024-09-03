import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Order } from "src/order/entities/order.entity";



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

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}