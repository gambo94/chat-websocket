var dataConversion = function (msgsArray) {
    return new Promise(function (resolve, reject) {
        var result = msgsArray.map(function (msg) {
            return {
                username: msg.username,
                message_content: msg.message_content,
                room: msg.room,
                message_date: (msg.message_date).getHours() + ":" + (msg.message_date).getMinutes()
            };
        });
        resolve(result);
        reject('error');
    });
};
// all                 
// message_date:`${(msg.message_date).getDate()}/${((msg.message_date).getMonth())+1}/${(msg.message_date).getFullYear()} ${(msg.message_date).getHours()}:${(msg.message_date).getMinutes()}`
module.exports = dataConversion;
//# sourceMappingURL=dateConversion.js.map