import "reflect-metadata";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import { getRepository } from "typeorm";
const dataConverter = require('../helpers/dateConversion')

const signupUser = async (user) => {
    const userRepo = getRepository(User);
    const userCreated = userRepo.create(user);
    return await userRepo.save(userCreated);
}

const getUsers = async () => {
    let users = await getRepository(User)
    .createQueryBuilder()
    .getMany();
    return users;
}

const userExists = async (username) => {
    let exists = await getRepository(User)
    .createQueryBuilder()
    .where('username = :username', { username: username })
    .getOne();
    return exists;
}

const logUser = async (user) => {
    let name = user.username;
    let pwd = user.password;
    console.log('from service', name)
    let result =  await getRepository(User)
    .createQueryBuilder()
    .where('user.username = :username', { username: name})
    .andWhere('user.password = :password', {password: pwd})
    .getOne();
    console.log('loguser',result)
}

const saveChatMessage = async (chatObj) => {
    const msgRepo = getRepository(Message);
    const msgCreated = msgRepo.create(chatObj);
    return await msgRepo.save(msgCreated);
}

const getMessages = async (room) => {
    const msgs = await getRepository(Message)
    .query(`
        SELECT id, username, message_content, room, message_date
        FROM message
        WHERE room = '${room}'
        ORDER BY message_date;
    `)
    const dateToString = await dataConverter(msgs);
    return dateToString;
}

module.exports = { userExists, getUsers, signupUser, logUser, 
    saveChatMessage, getMessages }