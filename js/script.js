"use strict";
let locationInput = document.getElementById('locationInput')
let locationButton = document.getElementById('locationButton')



// Current day.
let timeTextString = document.getElementById('time-text-string');
let timeText = document.getElementById('time-text');
let weatherLocation = document.querySelector('.weather-location')
let todayTemp = document.getElementById('today-temp');
let weatherStatusText = document.getElementById('weather-status');



// The following day after the current day.
let followingDay = document.getElementById('followingDay')
let followingDayTemp = document.getElementById('followingDayTemp')
let followingDayStatus = document.getElementById('followingDayStatus')



// The day after after.
let dayAfterAfter = document.getElementById('dayAfterAfter')
let temperatureAfterAfter = document.getElementById('temperatureAfterAfter')
let statusAfterAfter = document.getElementById('statusAfterAfter')

async function getWeather() {
    // Getting text from user.   ex. Egypt
    let text = locationInput.value;

    // Current day.
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8b646f6510db451c961175525241206&q=${text}`)
    let data = await response.json()


    // The next two days.
    let response1 = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=8b646f6510db451c961175525241206&q=${text}&days=3`)
    let data1 = await response1.json()
    

    const lastUpdated = data.current.last_updated;
    const date = new Date(lastUpdated);
    const dayOfWeekNumber = date.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[dayOfWeekNumber];

    // Main day.
    timeText.innerText = dayName
    todayTemp.innerText = `${data.current.temp_c}°C`
    weatherLocation.innerText = data.location.country
    weatherStatusText.innerText = data.current.condition.text
    timeTextString.innerText = lastUpdated

    // Following day 
    followingDay.innerText = data1.forecast.forecastday[1].date
    followingDayTemp.innerText = `${data1.forecast.forecastday[1].day.avgtemp_c}°C`
    followingDayStatus.innerText = data1.forecast.forecastday[1].day.condition.text

    // Following after after
    dayAfterAfter.innerText = data1.forecast.forecastday[2].date
    temperatureAfterAfter.innerText = `${data1.forecast.forecastday[2].day.avgtemp_c}°C`
    statusAfterAfter.innerText = data1.forecast.forecastday[2].day.condition.text

    
    
}

locationButton.addEventListener('click', function () {
    getWeather()
})



  