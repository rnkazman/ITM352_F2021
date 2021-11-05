var express = require('express');
var app = express();

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

var products = require('./product_data.json');
products.forEach((prod, i) => { prod.total_sold = 0 });

app.get("/product_data.js", function (request, response, next) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    response.send(products_str);
});

app.use(express.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {

    receipt = '';
    let qtys = request.body[`quantity_textbox`];
    for (i in qtys) {
        q = qtys[i];
        let brand = products[i]['brand'];
        let brand_price = products[i]['price'];
        if (isNonNegInt(q)) {
            products[i]['total_sold'] += Number(q);
            receipt += `<h3>Thank you for purchasing: ${q} ${brand}. Your total is \$${q * brand_price}!</h3>`; // render template string
        } else {
            receipt += `<h3><font color="red">${q} is not a valid quantity for ${brand}!</font></h3>`;
        }
    }
    response.send(receipt);
    response.end();

    function isNonNegInt(q, returnErrors = false) {
        errors = []; // assume no errors at first
        if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
        else {
            if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
            if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
        }
        return returnErrors ? errors : (errors.length == 0);
    }
});

app.use(express.static('./public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here