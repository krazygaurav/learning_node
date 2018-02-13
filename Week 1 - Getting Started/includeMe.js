console.log("I am included");

module.exports.age = 25;
module.exports.addNote = () => {
    console.log("Add note");
    return "New note";
};

module.exports.sum = (a, b) => {
    return a+b;
}
