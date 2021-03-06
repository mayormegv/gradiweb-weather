import { Component, OnChanges, OnInit } from '@angular/core';
import Forecast from './forecast';
import Weather from './weather';
import { WeatherService } from './weather.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  responseWeather: any;
  responseWeatherParis: any;
  responseForecast: Weather = {};
  fecha: any;
  nameDays: string[] = [];
  forecast: any[] = [];
  dayNow: number = 0;
  options: any = {weekday: 'long'};

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
      },
      
      error => console.log(error)
    );

    this.weatherService.getWeather('weather', 'paris').subscribe(
      respuesta => {
        return this.responseWeatherParis = respuesta;
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
                
            }

            //console.log(this.dayNow, day, contador);
            this.dayNow = day;
          });
      },
      error => console.log(error)
    );
  }
  
  title = 'gradiweb-weather';
}
