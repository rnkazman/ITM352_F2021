product = {name:'small gumball', price:'0.34'};

tax_rate = 0.045;

total = Number(product.price) + Number(product.price) * tax_rate;

console.log(`A ${product.name} costs ${total.toFixed(2)}`); 