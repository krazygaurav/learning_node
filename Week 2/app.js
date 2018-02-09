const request = require("request");

request({
    url: "http://maps.googleapis.com/maps/api/geocode/json?address=117/340%20agarwal%20farm%20mansarovar%20jaipur",
    json: true,
}, (error, response, body) => {
    console.log(body);
});