import { stationStore } from "../models/station-store.js";
import { dataConversions } from "./conversions.js";
import fetch from 'node-fetch';

export const dataTrends = {
  
    async checkForecast (station) {
    const lat = station.latitude;
    const long = station.longitude;
    const apiKey = "0c109ad6bb8a0b5d8a284ce6061f12c6";
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=` + lat + `&lon=` + long + `&appid=` + apiKey;
    const search = await fetch(url);
    const data = await search.json();
    let trends = {
      tempTrend: [],
      trendLabels: [],
    };
    let j = 0;
    for (let i = 4; i < data.list.length; i += 8) {
      let tempTrend = await dataConversions.rounder((data.list[i].main.temp)-273.15);
      trends.tempTrend.push(tempTrend);
      const date = new Date(data.list[i].dt * 1000);
      trends.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
      j++;
    }
    return trends;
  },
  
  async checkTrends(stationid) {
    const station = await stationStore.getStationByIdWithReadings(stationid);
    const upTrend = "icon-park-twotone:up-two";
    const downTrend = "icon-park-twotone:down-two";
    let results = {
        tempTrend: "",
        windTrend: "",
        pressureTrend: ""
      }
    
    if (station.readings.length < 3) {
      return results
    }
    let readings = Array(3);
    for (let i = 0; i < readings.length; i++) {
      readings[i] = station.readings[i];
    }
    for (let i = 0; i < station.readings.length; i++) {
      readings[0] = readings[1];
      readings[1] = readings[2];
      readings[2] = station.readings[i];
    } 
    
    if ((readings[0].temperature < readings[1].temperature) && (readings[1].temperature < readings[2].temperature))
      results.tempTrend = upTrend;
    else if ((readings[0].temperature > readings[1].temperature) && (readings[1].temperature > readings[2].temperature))
      results.tempTrend = downTrend;

    if ((readings[0].windSpeed < readings[1].windSpeed) && (readings[1].windSpeed < readings[2].windSpeed))
      results.windTrend = upTrend;
    else if ((readings[0].windSpeed > readings[1].windSpeed) && (readings[1].windSpeed > readings[2].windSpeed))
      results.windTrend = downTrend;

    if ((readings[0].pressure < readings[1].pressure) && (readings[1].pressure < readings[2].pressure))
      results.pressureTrend = upTrend;
    else if ((readings[0].pressure > readings[1].pressure) && (readings[1].pressure > readings[2].pressure))
      results.pressureTrend = downTrend;
    
    return results;
  }
}