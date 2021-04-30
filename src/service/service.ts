import "reflect-metadata";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import { getRepository } from "typeorm";

const signupUser = async (user) => {
    const userRepo = getRepository(User);
    const userCreated = userRepo.create(user);
    return await userRepo.save(userCreated);
}

const logUser = async (user) => {
    let name = user.username;
    let pwd = user.password;
    await getRepository(User)
    .createQueryBuilder()
    .where('username = :username OR password = :password', { username: name, password: pwd })
    .getOneOrFail();
}

const saveChatMessage = async (chatObj) => {
    const msgRepo = getRepository(Message);
    const msgCreated = msgRepo.create(chatObj);
    return await msgRepo.save(msgCreated);
}

module.exports = { signupUser, logUser, saveChatMessage }