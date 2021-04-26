import "reflect-metadata";
import {User} from "../entity/User";
import { getRepository } from "typeorm";

const signupUser = async (user) => {
    const userRepo = getRepository(User);
    const userCreated = userRepo.create(user);
    return await userRepo.save(userCreated);
}


module.exports = { signupUser }