import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Session {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    room: string;

    @Column({unique: true})
    username: string;

    @Column({type: "datetime", default:() => "CURRENT_TIMESTAMP"})
    session_date: Date;
}