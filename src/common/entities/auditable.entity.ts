import {
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from '../../users/entities/user.entity';

  export abstract class Auditable {

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        select: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        select: false
    })
    updatedAt: Date;

    @ManyToOne(() => User, {
        nullable: true,
        // eager: true // este sirve para que al momento de hacer un select de la entidad que tiene la relación, se traiga la relación también en la misma consulta (JOIN)
    })
    @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
    createdBy?: User;

  }