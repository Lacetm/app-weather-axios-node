const axios = require("axios")

const BASE_PATH = "http://api.openweathermap.org/data/2.5/weather"
const API_KEY = "253420d2dfade5797186d768e2a38528"

const prompt = (message, callback) => {
    const stdin = process.stdin
    const stdout = process.stdout

    stdin.resume();
    stdout.write(message);

    stdin.once("data", (data) => {
        callback(data.toString().trim());
    });

};

prompt("enter a location: ", function(location){
    if(!location){
        console.log("Error: Try again")
        process.exit();
    }


axios
    .get(`${BASE_PATH}?q=${location}&units=metric&appid=${API_KEY}`)
    .then((response) => {
        const weather = response;
        const message =  `\nCurrent date and time: ${weather.headers.date}\nIt's ${weather.data.main.temp} degrees in ${location}.`
        console.log(message)
        process.exit

    })
    .catch((err) =>{
        console.log(`Error: ${err.response.data.message}`);
        process.exit();
    });
});