require("./products_data.js");

var num_products = 5;

var count = 1;
while(count != (num_products + 1) ) {
    console.log(`${count}. ${eval('name' + count)}`);
    count++;
}
console.log("That's all we have!");