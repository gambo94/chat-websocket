const service = require('../service/service');
import { Request, Response } from 'express'


const saveChatMessage = async (user, msg) => {
    console.log('from controller', user, msg);
    let chatObj = {
        username: user,
        message_content: msg,
    }
    await service.saveChatMessage(chatObj);
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
        res.json({
            success: true,
            user: result
        })
    } catch (error) {
        res.status(400)
            .send({
                success: false,
                message: error.code
            })
    }
}

module.exports = { signup_user, saveChatMessage }