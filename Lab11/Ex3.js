var attributes  =  "<name>;<age>;<age + 0.5>;<0.5 - age>" ;

var my_array = ["Hi there", 5, true, "..."];

var pieces = attributes.split(";");
console.log(typeof(pieces));

for (i=0; i<pieces.length; i++) {
    console.log(pieces[i] + " " + typeof(pieces[i]));
}

var new_attributes = pieces.join(";");
console.log(new_attributes);