import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
Ñ
    products: Product[];


}
