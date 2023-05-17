const locationForm = document.querySelector("[data-location-form]");
const locationInput = document.querySelector("[data-location-input]");
const weatherInfoContainer = document.querySelector("[data-weather-info-container]");
const weatherLocationName = document.querySelector("[data-location-name]");
const dataLocationDate = document.querySelector("[data-location-date]");

locationForm.onsubmit = (e) => {
    e.preventDefault()
    let location = locationInput.value;
    if(location === "" || location == null) return alert("Please enter a valid city name")
    getWeatherData(location) 
    locationInput.value = "";
}

const getWeatherData = async (city) => {
    try{
        const data = await fetch("https://api.weatherapi.com/v1/current.json?key=b85521eadc7c4fe19b7190751231205 &q="+city+"&aqi=no")
        if(!data.ok) throw new Error("City not found. Please enter a valid city name")
        const dataResp = await data.json();
        displayWeather(dataResp);
    }catch(error){
        onError(error)
    }
}

function onError(error){
    weatherInfoContainer.style.display = "none";
    setTimeout(() => {
        alert(error)
    }, 10)
}

const displayWeather = (data) => {
    weatherInfoContainer.style.display = "";
    weatherLocationName.innerHTML = data.location.name;
    const splitDate = data.location.localtime.split(" ");
    dataLocationDate.innerHTML = `Last updated ${splitDate[1]}`;
    console.log(data)
} 

getWeatherData("Bucharest")
