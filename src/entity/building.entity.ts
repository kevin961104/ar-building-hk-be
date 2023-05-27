
import { Entity, Column, BaseEntity, Index, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { BuildingTransaction } from "./building_transaction.entity"

@Entity()
@Index(["id"], { unique: true })
@Index(["latitude", "longitude"], { unique: false })
export class Building extends BaseEntity  {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length: 1111, nullable: true})
    building_name_en: string

    @Column({length: 1111, nullable: true})
    estate_name_en: string

    @Column({length: 1111, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci'})
    building_name_zh: string

    @Column({length: 1111, nullable: true})
    district: string

    @Column({length: 1111, nullable: true})
    address: string

    @Column({length: 1111, nullable: true})
    year_built: string

    @Column({nullable: true})
    no_of_units: number

    @Column({nullable: true})
    no_of_storey: number

    @Column({nullable: true})
    no_of_basement: number

    @Column({length: 1111, nullable: true})
    building_description_en: string

    @Column({length: 1111, nullable: true, charset: 'utf8mb4', collation: 'utf8mb4_unicode_ci'})
    building_description_zh: string

    @Column({type: "decimal", precision: 20, scale: 15, default: 0})
    latitude: number

    @Column({type: "decimal", precision: 20, scale: 15, default: 0})
    longitude: number

    /*
    @OneToMany(() => BuildingTransaction, buildingTransaction => buildingTransaction.building)
    building_transacto: BuildingTransaction[];
    */
}