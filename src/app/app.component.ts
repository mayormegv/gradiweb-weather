import { Component, OnChanges, OnInit } from '@angular/core';
import UrlApp from './url-app';
import Weather from './weather';
import WeatherCity from './weather-city';
import { WeatherService } from './weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  responseWeather: any;
  responseWeatherCity: WeatherCity = {};
  responseWeatherParis: any;
  responseWeatherLyon: any;
  responseForecast: Weather = {};
  fecha: any;
  nameDays: string[] = [];
  forecast: any[] = [];
  dayNow: number = 0;
  options: any = {weekday: 'long'};
  urlImageBogota?: string = '';
  urlImageParis?: string = '';
  urlImageLyon?: string = '';
  urlsCityDays?: string[] = [];
  urlsImage: UrlApp = {
    sun: "https://www.arartur.com.tr/images/content/1284811945.png",
    rain: "https://www.freeiconspng.com/uploads/cloud-rain-icon-2.png",
    clouds: "https://www.freeiconspng.com/uploads/rain-cloud-icon-14.png"
  };

  constructor(private weatherService: WeatherService){

  }

  obtenerFecha() {
    const fecha = new Date();
    const day = fecha.getDate();
    this.dayNow = day;
  }

  ngOnInit(){

    this.weatherService.getWeather('weather', 'bogota').subscribe(
      respuesta => {
        this.responseWeather = respuesta;
        this.responseWeatherCity = respuesta;

        this.responseWeatherCity.weather?.forEach(element => {
          if(element.main == "Clouds"){
            this.urlImageBogota = this.urlsImage.clouds;
          }
          if(element.main == "Rain"){
            this.urlImageBogota = this.urlsImage.rain;
          }
          if(element.main == "Clear"){
            this.urlImageBogota = this.urlsImage.sun;
          }
        });
      },
      
      error => console.log(error)
    );

    this.weatherService.getWeather('weather', 'paris').subscribe(
      respuesta => {
        this.responseWeatherParis = respuesta;
        this.responseWeatherCity = respuesta;

        this.responseWeatherCity.weather?.forEach(element => {
          if(element.main == "Clouds"){
            this.urlImageParis = this.urlsImage.clouds;
          }
          if(element.main == "Rain"){
            this.urlImageParis = this.urlsImage.rain;
          }
          if(element.main == "Clear"){
            this.urlImageParis = this.urlsImage.sun;
          }
        });
      },
      error => console.log(error)
    );

    this.weatherService.getWeather('weather', 'lyon').subscribe(
      respuesta => {
        this.responseWeatherLyon = respuesta;
        this.responseWeatherCity = respuesta;

        this.responseWeatherCity.weather?.forEach(element => {
          if(element.main == "Clouds"){
            this.urlImageLyon = this.urlsImage.clouds;
          }
          if(element.main == "Rain"){
            this.urlImageLyon = this.urlsImage.rain;
          }
          if(element.main == "Clear"){
            this.urlImageLyon = this.urlsImage.sun;
          }
        });
      },
      error => console.log(error)
    );

    this.weatherService.getWeather('forecast', 'bogota').subscribe(
      respuesta => {
        this.responseForecast = respuesta;
        this.obtenerFecha();
        var contador = this.dayNow + 2;
        
          this.responseForecast.list?.forEach(element => {
            
            const fecha = new Date(element.dt_txt);
            const day = fecha.getDate();

            if(this.dayNow <= contador && day != this.dayNow){
              
              this.forecast.push(element);
              this.nameDays.push(fecha.toLocaleDateString("es-ES", this.options)
                );
                
                element.weather.forEach((item: { main: any; }) => {
                  if(item.main == "Clouds"){
                    this.urlsCityDays?.push(this.urlsImage.clouds);
                  }
                  if(item.main == "Rain"){
                    this.urlsCityDays?.push(this.urlsImage.rain);
                  }
                  if(item.main == "Clear"){
                    this.urlsCityDays?.push(this.urlsImage.sun);
                  }
                });
            }

            console.log("Urls", this.urlsCityDays);
            this.dayNow = day;
          });
      },
      error => console.log(error)
    );
  }
  
  title = 'gradiweb-weather';
}
