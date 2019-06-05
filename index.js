const server = require('./server.js')

const port = 5000;

server.listen(5000, function() {
    console.log(`Server is listening at port: ${port}`);
})