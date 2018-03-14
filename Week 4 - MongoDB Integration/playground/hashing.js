const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
    id: 10
};

var token = jwt.sign(data, "somesecret");
console.log(token);
var decoded = jwt.verify(token, "somesecret");
console.log(`Decoded: ${decoded}`);

// Manually managing the Security
// var message = "I am user number 3";
// var hash = SHA256(message).toString();

// console.log(`Message; ${message}. Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }


// token.data = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(data) + "somesecret").toString();
// if(resultHash === token.hash){
//     console.log("Data was not changed");
// }else{
//     console.log("Data is changed. Do not trust");
// }

