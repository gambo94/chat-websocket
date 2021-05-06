
const dataConversion = (msgsArray) => {
    return new Promise((resolve, reject) => {
        let result = msgsArray.map(msg => {
            return {
                username: msg.username,
                message_content: msg.message_content,
                room: msg.room,
                message_date:`${(msg.message_date).getHours()}:${(msg.message_date).getMinutes()}`
            }
        })
        resolve(result);
        reject('error');
    })
}

// all                 
// message_date:`${(msg.message_date).getDate()}/${((msg.message_date).getMonth())+1}/${(msg.message_date).getFullYear()} ${(msg.message_date).getHours()}:${(msg.message_date).getMinutes()}`


module.exports = dataConversion;