const express = require('express');
const server = express();


const cohortRouter = require('./routers/cohortRouter.js');

server.use(express.json());
server.use(logger);

server.use('/api/cohorts', cohortRouter);


/**************************************/
/*      Custom Middleware             */
/**************************************/

function logger(req, res, next) {
    console.log(`Method: ${req.method} requested at URL: ${req.url} on ${new Date().toISOString()}`);
    next();
} 



module.exports = server;