const service = require('../service/service');
const path = require('path');
import { Request, Response } from 'express'


const saveChatMessage = async (room, user, msg) => {
    try {
        let chatObj = {
            room,
            username: user,
            message_content: msg,
        }
        return await service.saveChatMessage(chatObj);
    } catch (error) {
        console.log(error);
    }
}

const get_messages = async (room) => {
    try {
        let messages = await service.getMessages(room);
        return messages;
    } catch (error) {
        console.log(error);
    }
}

const user_exists = async (username) => {
    try {
        let exists = await service.userExists(username);
        return exists;
    } catch (error) {
        console.log('erroooooorrrrr', error);
    }
}

const get_users = async (room) => {
    try {
        let users = await service.getUsers(room);
        return users;
    } catch (error) {
        console.log('error', error)
    }
}

const signup_user = async ( room, username, password) => {
    try {
        let user = { room, username, password }
        const result = await service.signupUser(user);
        return result;
    } catch (error) {
        return error;
    }  
}

module.exports = { user_exists, get_users, signup_user, 
    saveChatMessage, get_messages }