import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { OrderStatus } from "../dto/order-status-enum";


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column('decimal')
    totalPrice: number;

    @ManyToMany(() => Product, product => product.orders)
    @JoinTable({
        name: 'order_products',
        joinColumn: {
            name: 'order_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'product_id',
            referencedColumnName: 'id'
        }
    })
    products: Product[];

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.ACTIVE,
    })
    status: OrderStatus;


}
