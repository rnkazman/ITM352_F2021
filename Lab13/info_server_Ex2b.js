var express = require('express');
var app = express();

// Route to handle any request; also calls next
app.all('*', function (request, response, next) {
    request.send(request.method + ' to path: ' + request.path);
    next();
});

// Route to handle just the path /test
app.get('/test', function (request, response, next) {
    response.send('Got a GET request to path: test');
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here