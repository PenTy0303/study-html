const api_key = "b434448f7d7e5346220fd259cb742570";
const location_api_url = "https://api.openweathermap.org/geo/1.0/direct?q=&appid=";
const weather_api_url = "https://api.openweathermap.org/data/2.5/weather?lat=&lon=&appid=";

// これはElementList
const search = document.querySelector('.search').children;
const weather = document.querySelector('.weather').children;

// これだけNodeList
const cols = document.querySelectorAll('.details .col'); 



search[1].addEventListener('click', buttonClickListener);


async function getLoc(city_name) {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${api_key}`);
    const json = await response.json();
    
    if (json.length === 0) {
        alert('We cannot serach this city name, sry.');
    } else {
        return json[0];
    }
};

async function getWeather(loc, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${loc}&lon=${lon}&appid=${api_key}`);
    const json = await response.json();

    if (response.status === 400) {
        alert('Something went wrong.');
        search[0].value = '';
    } else {
        return json;
    }

};

async function buttonClickListener() {
    const input_city_name = search[0].value.toLowerCase();
    
    const location = await getLoc(input_city_name);
    
    const current_weather = await getWeather(location.lat, location.lon)
    

    const weather_icon = getWeatherIconPath(current_weather.weather[0].id);
    const temp = Math.floor(current_weather.main.temp - 273);
    const humidity = current_weather.main.humidity;
    const wind = current_weather.wind.speed;
    const city_name = current_weather.name;

    weather[0].src = weather_icon;
    weather[1].innerHTML = `${temp}°C`;
    weather[2].innerHTML = city_name;
    document.querySelector('.humidity').innerHTML = `${humidity}%`;
    document.querySelector('.wind').innerHTML = `${wind} km/h`;

    search[0].value = '';
};

function getWeatherIconPath(id) {
    CLERAR_800 = 'icons/clear.svg';
    CLOUDS_801_804 = 'icons/clouds.png';
    DRIZZLE_300_321 = 'icons/drizzle.svg';
    THUNDERSTORM_200_232 = 'icons/thunderstorm.png';
    RAIN_500_531 = 'icons/rain.svg';
    SNOW_600_622 = 'icons/snow.svg';
    MIST_701 = 'icons/mist.svg';

    if (200 <= id && id <= 232) {
        return THUNDERSTORM_200_232;
    }
    else if (300 <= id && id <= 321) {
        return DRIZZLE_300_321;
    }
    else if (500 <= id && 531 <= id) {
        return RAIN_500_531;
    }
    else if (600 <= id && id <= 622) {
        return SNOW_600_622;
    }
    else if (701 <= id && id <= 799) {
        return MIST_701;
    }
    else if (800 == id) {
        return CLERAR_800;
    }
    else if (801 <= id && id <= 804) {
        return CLOUDS_801_804;
    } else {
        return undefined;
    }
}


async function init(name) {
    const input_city_name = name;
    
    const location = await getLoc(input_city_name);
    
    const current_weather = await getWeather(location.lat, location.lon)
    

    const weather_icon = getWeatherIconPath(current_weather.weather[0].id);
    const temp = Math.floor(current_weather.main.temp - 273);
    const humidity = current_weather.main.humidity;
    const wind = current_weather.wind.speed;
    const city_name = current_weather.name;

    weather[0].src = weather_icon;
    weather[1].innerHTML = `${temp}°C`;
    weather[2].innerHTML = city_name;
    document.querySelector('.humidity').innerHTML = `${humidity}%`;
    document.querySelector('.wind').innerHTML = `${wind} km/h`;

    search[0].value = '';
};

init('New York');

