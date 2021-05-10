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

const user_exists = async (username, password) => {
    try {
        let exists = await service.userExists(username, password);
        return exists;
    } catch (error) {
        console.log('error from controller user_exists', error);
        return error;
    }
}

const get_sessions = async (room) => {
    try {
        let sessions = await service.getSessions(room);
        return sessions;
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

const insert_session = async ( room, username ) => {
    try {
        let session = { room, username }
        const result = await service.newSession(session);
        return result;
    } catch (error) {
        return error;
    }
}

const remove_session = async ( username, room ) => {
    try {
        const result = await service.deleteSession(username, room);
        return result;
    } catch (error) {
        return error;
    }
}

module.exports = { user_exists, get_sessions, signup_user, 
    saveChatMessage, get_messages, insert_session, remove_session }