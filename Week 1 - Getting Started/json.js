var obj = {
    name: "Gaurav Singhal"
};

var stringObj = JSON.stringify(obj);

console.log(typeof stringObj);
console.log(stringObj);

var processString = '{"name": "Gaurav", "age": 25}';
var person = JSON.parse(processString);
console.log("Parsed Object: "+ person.name + " " + person.age);

