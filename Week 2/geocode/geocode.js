const request = require("request");

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        request({
            url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true 
        }, (error, response, body) => {
            if(error){
                reject("Unable to connect to Google Servers");
            } else if(body.status === "ZERO_RESULTS"){
                reject("Unable to find that address");
            } else if(body.status === "OK"){
                resolve({
                    address: body.results[0].formatted_address,
                    lattitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            } else{
                reject("Error getting the address");
            }
        });
    });
};
geocodeAddress("19146").then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});

// var geocodeAddress = (address, callback) => {
//     var encodedAddress = encodeURIComponent(address);
//     request({
//         url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
//         json: true,
//     }, (error, response, body) => {
//         if(error){
//             callback("Unable to connect to Google Servers");
//         } else if(body.status === "ZERO_RESULTS"){
//             callback("Unable to find that address");
//         } else if(body.status === "OK"){
//             callback(undefined, {
//                 address: body.results[0].formatted_address,
//                 lattitude: body.results[0].geometry.location.lat,
//                 longitude: body.results[0].geometry.location.lng
//             });
//         } else{
//             callback("Error occured");
//         }
//     });
// }

// module.exports = {
//     geocodeAddress,
// }