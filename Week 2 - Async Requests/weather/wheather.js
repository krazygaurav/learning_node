const request = require("request");

var getWhether = (lat, lng, callback) => {
    var API_KEY = "bc07622339e5eed83cb71608660dbe41";

    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}`,
        json: true,
    }, (error, response, body) => {
        if(error){
            callback("Error getting data from Forecast.io servers");
        }else if(response.statusCode === 400){
            callback("Unable to fetch whether");
        }else if(response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports = {
    getWhether,
}

