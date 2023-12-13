const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/weather", (req, res) => {
    res.sendFile(__dirname + "/weather.html");
});

app.post('/weathercal', async (req, res) => {
    var city = req.body.num88;
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4192a0ca77f4779d22d9b3d97173f01f&lang=th&units=metric`);
        const weatherData = response.data;
        let imgURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

        const weatherInfo = {
            cityName: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
            imgURL: weatherData.weather[0].icon,
        };

        res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
        res.write("<p>ณ จังหวัด " + weatherInfo.cityName + "</p>");
        res.write("<p>มีอากาศ " + weatherInfo.temperature + "</p>");
        res.write("<p>สภาพอากาศในตอนนี้ " + weatherInfo.description + "</p>");
        res.write("<img src=" + imgURL + " >");
        res.end();
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).send('Error fetching weather data: City not found.');
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
