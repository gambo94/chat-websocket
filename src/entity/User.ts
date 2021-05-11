import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column({type: "datetime", default:() => "CURRENT_TIMESTAMP"})
    signup_date: Date;
}
