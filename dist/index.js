var express = require('express');
var app = express();
var routes = require('./routes/router');
var morgan = require('morgan');
// Settings
app.set('port', process.env.PORT || 3000);
// middlewares
app.use(express.json());
app.use(morgan('dev'));
// routes
app.use(routes);
app.listen(app.get('port'), function () {
    // connecting to DB
    var connect = require('./config/dbConnect')();
    // server running
    console.log("Server running on port " + app.get('port'));
});
//# sourceMappingURL=index.js.map