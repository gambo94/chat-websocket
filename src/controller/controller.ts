const service = require('../service/service');
const path = require('path');
import { Request, Response } from 'express'


const saveChatMessage = async (user, msg) => {
    console.log('from controller', user, msg);
    let chatObj = {
        username: user,
        message_content: msg,
    }
    await service.saveChatMessage(chatObj);
}

const log_user = async (req: Request, res: Response) => {
    let username = req.body.username;
    let passowrd = req.body.password;
    let userObj = {
        username,
        passowrd
    }
    try {
        await service.logUser(userObj);
        res.sendFile((path.join(__dirname, '/../../public/chat.html')));
    } catch (error) {
        res.send(error);
    }
}

const signup_user = async (req: Request, res: Response) => {
    let username = req.body.username;
    let password = req.body.password;
    let newUser = { 
        username, 
        password
    };
    try {
        const result = await service.signupUser(newUser)
        res.sendFile((path.join(__dirname, '/../../public/index.html')));
    } catch (error) {
        res.status(400)
            .send({
                success: false,
                message: error.code
            })
    }
}

module.exports = { signup_user, log_user, saveChatMessage }