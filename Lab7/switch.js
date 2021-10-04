var purchase = 11;
var state = "DE";
var tax_rate = -1;

switch (state) {
    case 'HI':
        tax_rate = 0.04172;
        break;
    case 'VT':
    case 'DE':
        tax_rate = 0.06;
        break;
    case 'CA':
        tax_rate = 0.0725;
        break;
    default:
        tax_rate = -1;
        break;        
}

var tax_owing = purchase * tax_rate;
var grand_total = purchase + tax_owing;
grand_total = grand_total.toFixed(2);

if (tax_rate == -1) {
    console.log("Enter a valid state code!");
} else {
    console.log("In " + state + " you need to pay $" + grand_total);
}