const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// document.addEventListener('keydown' , (e) => {
//     if(e.key === 'Enter'){
//         search.click();
//     }
// });


document.addEventListener('keydown' , (e) => {
    const cityInput = document.querySelector('.search-box input');
    if(e.key === 'Enter' || cityInput.value.trim() === ''){
        search.click();
    }
});

search.addEventListener('click' , () => {

    const APIKey = '5484d3cc17db064d4ea2e10174b881c0';
    const city = document.querySelector('.search-box input').value;

    if(city === ''){
        container.style.height = '';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'none';
        return ;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)
         .then(response => response.json())
         .then(json => {

            if(json.cod === '404'){
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return ;
            }


            error404.style.display = 'none';
            error404.classList.remove('fadeIn');


            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');


            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = '';
            }


            temperature.innerHTML = `${parseInt(json.main.temp - 273.15)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;


            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
         });
});