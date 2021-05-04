import "reflect-metadata";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import { getRepository } from "typeorm";

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
    console.log(exists)
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
    console.log(result)
}

const saveChatMessage = async (chatObj) => {
    const msgRepo = getRepository(Message);
    const msgCreated = msgRepo.create(chatObj);
    return await msgRepo.save(msgCreated);
}

module.exports = { userExists, getUsers, signupUser, logUser, saveChatMessage }