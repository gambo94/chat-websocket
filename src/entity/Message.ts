import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    username: string;

    @Column()
    message_content: string;

    @Column({type: "datetime", default:() => "CURRENT_TIMESTAMP"})
    message_date: Date;
}