import {BaseStructure} from "../../../core/structures/base.structure";
import {CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class BaseTypeOrmEntity implements BaseStructure{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'timestamp'})
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleted_at', type: 'timestamp'})
    deletedAt: Date;
}