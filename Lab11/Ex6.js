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

/* for (testVal in pieces) {
    console.log(testVal + ": " + pieces[testVal] + " " + isNonNegativeInteger(pieces[testVal], true));
} */

// Callback function to check whether array elements are non-negative integers
function checkIt(elem, index) {
    console.log(`${index}: ${elem} is ${(isNonNegativeInteger(elem) ? 'a' : 'not a')} valid quantity`);
}

// Apply checkIt to pieces array
pieces.forEach(checkIt);

console.log("=============");

pieces.forEach( (elem, index) => {console.log(`${index}: ${elem} is ${(isNonNegativeInteger(elem) ? 'a' : 'not a')} valid quantity`);} )
