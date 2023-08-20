import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { readingStore } from "./reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { dataConversions } from "../utils/conversions.js";

const db = initStore("latestReadings");

export const latestReadingStore = {

  async addLatestReading(stationId, newLatestReading) {
    await db.read();
    await latestReadingStore.deleteLatestReading(stationId);
    const windDirectionCompass = await stationAnalytics.getWindDirection(newLatestReading.windDirection);
    const windSpeedBeaufort = await dataConversions.windSpeedToBeaufort(newLatestReading.windSpeed);
    const temperatureFahrenheit = await dataConversions.celsiusToFahrenheit(newLatestReading.temperature);
    const latestReading = {      
      code: newLatestReading.code,
      temperature:  newLatestReading.temperature,
      temperatureFahrenheit: temperatureFahrenheit,
      windSpeed:  newLatestReading.windSpeed,
      windDirection:  newLatestReading.windDirection,
      windDirectionCompass: windDirectionCompass,
      windSpeedBeaufort: windSpeedBeaufort,  
      pressure:  newLatestReading.pressure,
      time: newLatestReading.time,
      _id: v4(),
      stationid: stationId,
    }
    db.data.latestReadings.push(latestReading);
    console.log(latestReading);
    await db.write();
    return latestReading;
  },
  
  async addPlaceholderLatestReading(stationId) {
    await db.read();
    const latestReading = {      
      code: Number(100),
      temperature:  Number(0),
      temperatureFahrenheit: Number(0),
      windSpeed:  Number(0),
      windDirection:  Number(0),
      windSpeedBeaufort: Number(0),
      windDirectionCompass: " ",  
      pressure:  Number(0),
      time:  Number(0),
      _id: v4(),
      stationid: stationId,
    }
    db.data.latestReadings.push(latestReading);
    await db.write();
    return latestReading;
  },

  async getLatestReadingByStationId(stationId) {
    await db.read();
    return db.data.latestReadings.filter((latestReading) => latestReading.stationid === stationId);
  },
  
    async deleteLatestReading(stationId) {
    await db.read();
    const index = await db.data.latestReadings.findIndex((latestReading) => latestReading._stationId === stationId);
    // console.log(index);
    db.data.latestReadings.splice(index, 1);
    console.log(`Deleted the last latest reading for station ${stationId}`);
    await db.write();
  },
  
    async deleteAllLatestReadings() {
    db.data.latestReadings = [];
    await db.write();
  },
};