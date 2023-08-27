import { stationStore } from "../models/station-store.js";

export const minMax = {
  
    async setMinMaxValues(station) {
      const source = await stationStore.getStationByIdWithReadings(station._id);
      let firstReading = source.readings[0];
      if (firstReading === undefined) {
        firstReading = {
          temperature: 0,
          windSpeed: 0,
          pressure: 0,
        }
      }
      station.maxTemp = firstReading.temperature;
      station.minTemp = firstReading.temperature;
      station.maxWindSpeed = firstReading.windSpeed;
      station.minWindSpeed = firstReading.windSpeed;
      station.maxPressure = firstReading.pressure;
      station.minPressure = firstReading.pressure;
      if ((source.readings.length > 1) || (source.readings.length != undefined)) {
        for (let i = 0; i < source.readings.length; i++) {
          if (source.readings[i].temperature > station.maxTemp) station.maxTemp = source.readings[i].temperature;
          if (source.readings[i].temperature < station.minTemp) station.minTemp = source.readings[i].temperature;
          if (source.readings[i].windSpeed > station.maxWindSpeed) station.maxWindSpeed = source.readings[i].windSpeed;
          if (source.readings[i].windSpeed < station.minWindSpeed) station.minWindSpeed = source.readings[i].windSpeed;
          if (source.readings[i].pressure > station.maxPressure) station.maxPressure = source.readings[i].pressure;
          if (source.readings[i].pressure < station.minPressure) station.minPressure = source.readings[i].pressure;
        }
      }
      return station;
    }
}