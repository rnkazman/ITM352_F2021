var total = 10.50;
var state = 'HI';
var tax_rate = 0;

switch (state) {
    case 'HI':
    tax_rate = 0.04172;
    break;
  case 'VT':
    tax_rate = 0.03;
    break;
  default:
    tax_rate = -1;
}

var grand_total = total + (total * tax_rate);
grand_total = grand_total.toFixed(2);
console.log("In " + state + " you need to pay $" + grand_total);
