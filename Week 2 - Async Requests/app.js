
const yargs = require("yargs");
const geocode = require("./geocode/geocode.js");
const weather = require("./weather/wheather.js");

var argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for",
            string: true,
        }
    })
    .help()
    .alias("help", "h")
    .argv;

    
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage){
        console.log("Error in getting address");
    }else{
        console.log(`Address:  ${results.address}`);
        weather.getWhether(results.lattitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log("Error in getting weather details");
            }else{
                console.log(`Its currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});

//bc07622339e5eed83cb71608660dbe41
//https://api.darksky.net/forecast/bc07622339e5eed83cb71608660dbe41/37.8267,-122.4233
