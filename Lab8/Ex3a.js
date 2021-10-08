require("./products_data.js");

for (var count = 1; eval("typeof name"+count) != 'undefined'; count++) {
    console.log(`${count}. ${eval('name' + count)}`);
}