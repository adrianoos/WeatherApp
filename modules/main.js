
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

    handleSubmit = () => { // Submit action 
        if (event.type === 'click' || event.key === 'Enter') {
          this.fadeInOut();
          let query = this.viewElems.searchInput.value; 
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
        if (this.viewElems.mainContainer.style.opacity === '1' ||this.viewElems.mainContainer.style.opacity === '') { // jeśli opacity mainContainera jest 1 lub puste (widoczny)
            this.viewElems.mainContainer.style.opacity = '0';
                } else {
                    this.viewElems.mainContainer.style.opacity = '1';
                }
    };
    switchView = () => { // Switching view for data display
        if (this.viewElems.weatherSearchView.style.display !== 'none') { 
            this.viewElems.weatherSearchView.style.display = 'none' 
            this.viewElems.weatherForecastView.style.display = 'flex' 
        } else { // w innym przypadku 
            this.viewElems.weatherForecastView.style.display = 'none' 
           this.viewElems.weatherSearchView.style.display = 'flex' 
        }
        };

        returnToSearch = () => { // return button action
            this.fadeInOut() // zmień przeźroczystość
        
            setTimeout(() => { // wykonaj po czasie
                this.switchView()
                this.fadeInOut()
            }, 500);
            setTimeout(this.clearSearchInput, 1000)
        };
        
    displayWeatherData = data => { // display weather data 
        this.switchView();
        this.fadeInOut();
            
        const weather = data.consolidated_weather[0]; 
    
        this.viewElems.weatherCity.innerText = data.title; 
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
        this.viewElems.weatherIcon.alt = weather.weather_state_name;
        
        const currTemp = weather.the_temp.toFixed(2);
        const maxTemp = weather.max_temp.toFixed(2);
        const minTemp = weather.min_temp.toFixed(2);
        
        this.viewElems.weatherCurrentTemp.innerText = `Current Temperature: ${currTemp} °C`
        this.viewElems.weatherMaxTemp.innerText = `Max Temperature: ${maxTemp} °C`
        this.viewElems.weatherminTemp.innerText = `Min Temperature: ${minTemp} °C`
        
        }

}

document.addEventListener('DOMContentLoaded', new WeatherApp());

