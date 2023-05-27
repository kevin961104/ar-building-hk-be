
import { Entity, Column, BaseEntity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Building } from "./building.entity"

@Entity()
@Index(["id"], { unique: true })
@Index(["latitude", "longitude"], { unique: false })
export class BuildingTransaction extends BaseEntity  {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable: true})
    unnamed: number

    @Column({length: 1111, nullable: true})
    price: string

    @Column({length: 1111, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci'})
    nfa: string

    @Column({length: 1111, nullable: true})
    date: string

    @Column({length: 1111, nullable: true})
    address: string

    @Column({length: 1111, nullable: true})
    orientation: string

    @Column({length: 1111, nullable: true})
    project_name: string

    @Column({length: 1111, nullable: true})
    building_age: string

    @Column({length: 1111, nullable: true})
    photo: string

    @Column({length: 1111, nullable: true})
    unit: string

    @Column({length: 1111, nullable: true})
    room: string

    @Column({length: 1111, nullable: true})
    block: string

    @Column({length: 1111, nullable: true})
    district: string

    @Column({type: "decimal", precision: 20, scale: 15, default: 0})
    latitude: number

    @Column({type: "decimal", precision: 20, scale: 15, default: 0})
    longitude: number

    @Column({ nullable: true })
    buildingId: number

    @ManyToOne(() => Building, {createForeignKeyConstraints: true})
    @JoinColumn()
    building: Building
}