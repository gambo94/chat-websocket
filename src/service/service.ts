import "reflect-metadata";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import {Session} from "../entity/Session";
import { getRepository } from "typeorm";
const dataConverter = require('../helpers/dateConversion')

const signupUser = async (user) => {
    const userRepo = getRepository(User);
    const userCreated = userRepo.create(user);
    return await userRepo.save(userCreated);
}



const userExists = async (username, password) => {
    let exists = await getRepository(User)
    .query(`
        SELECT username, room, password 
        FROM user
        WHERE username='${username}'
        AND password = '${password}'
    `)
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

const userAuth = async (username, password) => {
    let existsUsername = await getRepository(User)
    .query(`
        SELECT username, password 
        FROM user
        WHERE username='${username}'
    `)
    if (existsUsername === undefined || existsUsername.length === 0){
        return false;
        }
    let existsPwd  = await getRepository(User)
    .query(`
        SELECT username, password 
        FROM user
        WHERE password='${password}'
    `)
    if (existsPwd === undefined || existsPwd.length === 0){
        return false;
    }
    return true;
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

const newSession = async (session) => {
    const sessionRepo = getRepository(Session);
    const sessionCreated = sessionRepo.create(session);
    return await sessionRepo.save(sessionCreated);
}

const deleteSession = async (username, room) => {
    const deleteSession = await getRepository(Session)
    .query(`
        DELETE FROM session
        WHERE username = '${username}'
        AND room = '${room}'
    `)
}

const getSessions = async (room) => {
    const sessions = await getRepository(Session)
    .query(`
        SELECT username, room
        FROM session
        WHERE room = '${room}'
    `)
    return sessions;
}

module.exports = { userExists, signupUser, logUser, userAuth,
    saveChatMessage, getMessages, newSession, deleteSession, getSessions }