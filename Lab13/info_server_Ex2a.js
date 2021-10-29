var express = require('express');
var app = express();

// Route to handle any request
app.all('*', function (request, response, next) {
    request.send(request.method + ' to path: ' + request.path);
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here