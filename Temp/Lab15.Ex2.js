var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var filename = "./user_data.json";
var queryString = require("query-string");
var cookieParser = require('cookie-parser');
const { networkInterfaces } = require('os');
var session = require('express-session');

app.use(session({secret: "MySecretKey", resave: true, saveUninitialized: true}));
app.use(cookieParser());
app.use(myParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

if (fs.existsSync(filename)) {
    data = fs.readFileSync(filename, 'utf-8');

    user_data = JSON.parse(data);
    console.log("User_data=", user_data);

    fileStats = fs.statSync(filename);
    console.log("File " + filename + " has " + fileStats.size + " characters");
} else {
    console.log("Enter the correct filename bozo!");
}

// Simple example of how sessions can store data between requests
app.get('/', function (request, response) {
    if (request.session.page_views) {
        request.session.page_views++;
        //console.log(request.session);

        if (typeof request.cookies["username"] != undefined) {
            console.log("Got user cookie " + request.cookies["username"]);
        } 

        if (request.session.username) {
            user = request.session.username;
        }
        else {
            user = "Not logged in";
        }
        response.send(`Welcome back ${user}. This is visit # ${request.session.page_views}`);
    } else {
        request.session.page_views = 1;
        response.send("Welcome to this page for the first time!");
    }
});

app.get("/set_cookie", function (request, response) {
    my_name = "Rick Kazman";
    now = new Date();
    response.cookie('My Name', my_name, {maxAge: 5000}).send('cookie set');
    //response.cookie('My Name', my_name, {"expire": 5000 + now.getTime()});
    //response.send("Cookie sent");
});

app.get("/use_cookie", function (request, response) {
    my_cookie_name = request.cookies["My Name"];
    response.send("User " + my_cookie_name + " logged in!");
});

app.get("/use_session", function (request, response) {
    response.send("Your session ID is " + request.session.id);
});

    // Simple example of destroying a session 
app.get("/destroy_session", function (request, response) {
    request.session.destroy();
    response.send("Session nuked!");
});


app.get("/login", function (request, response) {
    // Give a simple login form
    if (typeof request.session['last_login'] != 'undefined') {
        last_login = "Last login time was " + request.session['last_login'];
    } else {
        last_login = "First login";
    }
    str = `
<body>
Last login: ${last_login}
<br>
<form action="/login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log("Got a POST to login");
    POST = request.body;

    request.session['last_login'] = Date();

    user_name = POST["username"];
    user_pass = POST["password"];
    console.log("User name=" + user_name + " password=" + user_pass);

    if (user_data[user_name] != undefined) {
        if (user_data[user_name].password == user_pass) {
            // Good login
            response.cookie("username", user_name, {"maxAge": 10*1000});
            request.session.username = user_name;
            response.send(`Welcome ${user_name}`);
        } else {
            // Bad login, redirect
            response.send("Sorry bud");
        }
    } else {
        // Bad username
        response.send("Bad username");
    }

});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register" method="POST">`;
    if (request.query["name_err"] == undefined) {
        str += `<input type="text" name="username" size="40" placeholder="enter username" ><br>`;
    } else {
        str += `<input type="text" name="username" size="40" placeholder="${request.query['name_err']}">User already exists<br>`;
    }

    str += `<input type="password" name="password" size="40" placeholder="enter password"><br>
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br>
<input type="email" name="email" size="40" placeholder="enter email"><br>
<input type="submit" value="Submit" id="submit">
</form> 
</body>
    `;
    response.send(str);
});

app.post("/register", function (request, response) {
    // process a simple register form
    console.log("Got a POST to register");
    POST = request.body;

    user_name = POST["username"];
    user_pass = POST["password"];
    user_email = POST["email"];
    user_pass2 = POST["repeat_password"];
    query_response = "";

    if (user_data[user_name] == undefined) {
        console.log("Adding user: " + user_name);

        user_data[user_name] = {};
        user_data[user_name].name = user_name;
        user_data[user_name].password = user_pass;
        user_data[user_name].email = user_email;

        data = JSON.stringify(user_data);
        fs.writeFileSync(filename, data, "utf-8");

        response.redirect("login");
    } else {
        query_response += "name_err=" + user_name;
        console.log("Bad request to add user: " + user_name);
        response.redirect("register" + "?" + query_response);
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));
