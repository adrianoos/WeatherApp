
import { getWeatherByCity } from "./ApiService.js"
import { mapListToDOMElements } from "./DOMactions.js" 

class WeatherApp { 
    constructor() {
        this.viewElems = {} 
        this.initializeApp();
    };

initializeApp = () => { // conecting DOM elems and setup app listeners
    this.connectDOMElements()
    this.setupListeners()
};

connectDOMElements = () => { // Conecting DOM elems to object
const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id); 
this.viewElems = mapListToDOMElements(listOfIds); 
    };

setupListeners = () => { // Listeners setup
        this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
        this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
    };

    handleSubmit = () => {
        let query = this.viewElems.searchInput.value; 
        if (query !== "" && event.type === 'click' || event.key === 'Enter') {
          this.fadeInOut();
          getWeatherByCity(query).then(data => { 
            this.displayWeatherData(data);
            this.viewElems.searchInput.style.borderColor = 'black';
          }).catch(() => { 
            this.fadeInOut();
        this.changeLabelText();
        setTimeout(this.revLabelText, 2500);
        setTimeout(this.clearSearchInput, 1000);
          })
        }
      };

changeLabelText = () => {this.viewElems.label1.innerText = 'Sorry no data for this City'};
revLabelText = () => {this.viewElems.label1.innerText = 'Check Weather For: '};
clearSearchInput = () => {this.viewElems.searchInput.value = ''};

fadeInOut = () => {
        if (this.viewElems.mainContainer.style.opacity === '1' ||this.viewElems.mainContainer.style.opacity === '') {
            this.viewElems.mainContainer.style.opacity = '0';
                } else {
                    this.viewElems.mainContainer.style.opacity = '1';
                }
    };
    switchView = () => { 
        if (this.viewElems.weatherSearchView.style.display !== 'none') { 
            this.viewElems.weatherSearchView.style.display = 'none' 
            this.viewElems.weatherForecastView.style.display = 'flex' 
        } else {
            this.viewElems.weatherForecastView.style.display = 'none' 
           this.viewElems.weatherSearchView.style.display = 'flex' 
        }
        };

        returnToSearch = () => { 
            this.fadeInOut() 
            setTimeout(() => {
                this.switchView()
                this.fadeInOut()
            }, 500);
            setTimeout(this.clearSearchInput, 1000)
        };
        
    displayWeatherData = data => {
        this.switchView();
        this.fadeInOut();
        let windDirection = data.wind.deg
        let calcWindDir;
        if ( 337.5 < windDirection <   22.5 ) {
            calcWindDir = "South"
        } else if ( 22.5 < windDirection < 67.5 ) {
            calcWindDir = "South-West"
        } else if ( 67.5 < windDirection < 112.5) {
            calcWindDir = "West"
        } else if ( 112.5 < windDirection < 157.5) {
            calcWindDir = "North-West"
        } else if ( 157.5 < windDirection < 202.5) {
            calcWindDir = "North"
        } else if ( 202.5 < windDirection< 247.5) {
            calcWindDir = "North-East"
        } else if ( 247.5 < windDirection < 292.5 ) {
            calcWindDir = "East"
        } else if ( 292.5 < windDirection < 337.5) {
            calcWindDir = "South-East"
        }
        const icoCode = data.weather[0].icon
        const weather = data.main; 
        this.viewElems.weatherCity.innerText = data.name; 
        this.viewElems.country.innerText = data.sys.country;
        this.viewElems.windspeed.innerText = "Wind speed: " + data.wind.speed + "Kmh" + " from: " + calcWindDir; 
        this.viewElems.description.innerText = "Description: " + data.weather[0].main; 
        this.viewElems.weatherIcon.src = `http://openweathermap.org/img/w/${icoCode}.png`;
        const currTemp = (data.main.temp - 273).toFixed(2);
        const maxTemp = (data.main.temp_max - 273).toFixed(2);
        const minTemp = (data.main.temp_min - 273).toFixed(2);
        this.viewElems.weatherCurrentTemp.innerText = `Current Temperature: ${currTemp} °C`
        this.viewElems.weatherMaxTemp.innerText = `Max Temperature: ${maxTemp} °C`
        this.viewElems.weatherminTemp.innerText = `Min Temperature: ${minTemp} °C`
        };
};

document.addEventListener('DOMContentLoaded', new WeatherApp());

