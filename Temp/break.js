var start = 521;
const divisor = 1113;
var counter = start;

while (counter % divisor != 0) {
    console.log (counter + " is not evenly divisible");
    counter++;
    if (counter > 1000)         // If we can't find a divisor in a reasonable time, give up
        break;
}

if (counter % divisor == 0)
    console.log ("We did it! " + counter + " is divisible by " + divisor);
else
    console.log("We give up!");