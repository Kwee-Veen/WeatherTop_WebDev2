import { readingStore } from "../models/reading-store.js";
import { stationStore } from "../models/station-store.js";
import { dataConversions } from "./conversions.js";
import { minMax } from "./min-max.js";
import { dataTrends } from "./trends.js";
import { initStore } from "./store-utils.js";
import { v4 } from "uuid";

const db = initStore("stations");

export const stationAnalytics = {
    
    async updateWeather(inputStationid) {
    await db.read();
    let station = await stationStore.getStationById(inputStationid);
    const lastReading = await readingStore.getMostRecentReadingByStationId(station._id);
    const latestWeather = await dataConversions.getWeather(lastReading.code);
    const windDirectionCompass = await dataConversions.getWindDirection(lastReading.windDirection);
    const windSpeedBeaufort = await dataConversions.windSpeedToBeaufort(lastReading.windSpeed);
    const temperatureFahrenheit = await dataConversions.celsiusToFahrenheit(lastReading.temperature);
    const windChill = await dataConversions.getWindChill(lastReading.temperature, lastReading.windSpeed);
    const trends = await dataTrends.checkTrends(station._id);
    const latestReading = {      
      weather: latestWeather.weather,
      weatherIcon: latestWeather.icon,
      temperature:  lastReading.temperature,
      temperatureFahrenheit: temperatureFahrenheit,
      windSpeed:  lastReading.windSpeed,
      windDirection:  lastReading.windDirection,
      windDirectionCompass: windDirectionCompass,
      windSpeedBeaufort: windSpeedBeaufort,  
      pressure:  lastReading.pressure,
      windChill: windChill,
      time: lastReading.time,
      _id: v4(),
      stationid: station._id,
    }
    station.latestReading = latestReading;
    station.tempTrend = trends.tempTrend;
    station.windTrend = trends.windTrend;
    station.pressureTrend = trends.pressureTrend;
    station = await minMax.setMinMaxValues(station);
    const index = await db.data.stations.findIndex((station) => station._id === inputStationid);
    db.data.stations.splice(index, 1, station);
    await db.write();
  }
};