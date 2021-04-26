import { createConnection } from "typeorm";
import "reflect-metadata";



const connect = async () => {
    createConnection()
    .then(async (connection) =>{
      console.log('Connected to DB');
    })
    .catch(error => console.log(error));
}

module.exports = connect;