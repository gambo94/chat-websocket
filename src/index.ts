const express = require('express');
const app = express();
const routes = require('./routes/router')
const morgan = require('morgan');

// Settings
app.set('port', process.env.PORT || 3000)


// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use(routes);




app.listen(app.get('port'), () => {
    // connecting to DB
    const connect = require('./config/dbConnect')();
    // server running
    console.log(`Server running on port ${app.get('port')}`)
})






