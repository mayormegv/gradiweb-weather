import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  url: string = "";
  appId: string = "61af096d2da6881470cbe20d044441ac";

  constructor(private httpClient: HttpClient) {
    this.url = "http://api.openweathermap.org/data/2.5/";
   }

   public getWeather(apiName: string, city: string) {
    return this.httpClient.get(`${this.url}${apiName}?units=metric&q=${city}&appid=${this.appId}`);
   }
}
