function convertTemperature(tempIn, units) {
    // Function to convert temperatures from C to F and from F to C
    // tempIn is the temperature you wish to convert in either units
    // units is either "C" or "F", the direction of the conversion

    if (units == "F") {
        return (tempIn - 32) * 5 / 9;
    } else if (units == "C") {
        return tempIn * 9 / 5 + 32;
    } else {
        return NaN;
    }
}

/* console.log("0 C =", convertTemperature(0, "C"));
console.log("212 F=", convertTemperature(212, "F"));
console.log("Bad input =", convertTemperature(212,"Q"));
*/

var attributes = "5;-3;0;xxx;7.5;13" ;
var pieces = attributes.split(";");

function isNonNegativeInteger(inputString, returnErrors = false) {
    // Validate that an input value is a non-negative integer
    // inputString is the input string; returnErrors indicates how the function returns: true means return the
    // array and false means return a boolean.

    errors = []; // assume no errors at first
    if (Number(inputString) != inputString) errors.push('Not a number!'); // Check if string is a number value
    if (inputString < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(inputString) != inputString) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
}

for (testVal in pieces) {
    console.log(testVal + ": " + pieces[testVal] + " " + isNonNegativeInteger(pieces[testVal], true));
}