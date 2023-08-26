import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { stationAnalytics } from "../utils/station-analytics.js";

const db = initStore("readings");

export const readingStore = {
  async getAllReadings() {
    await db.read();
    return db.data.readings;
  },

  async addReading(stationId, reading) {
    await db.read();
    reading._id = v4();
    reading.stationid = stationId;
    db.data.readings.push(reading);
    await db.write();
    return reading;
  },

  async addInitialLatestReading(inputStation, stationid) {
    await db.read();
    let station = inputStation;
    const reading = {      
      _id: v4(),
      stationid: stationid,
      code: 0,
      temperature: 0,
      windSpeed: 0,
      windDirection: 0,
      pressure : 0,
      time: "Placeholder",
    }
    station.latestReading = reading;
    db.data.readings.push(reading);
    await db.write();
    return station;
  },
  
  async getReadingsByStationId(id) {
    await db.read();
    return db.data.readings.filter((reading) => reading.stationid === id);
  },

  async getReadingById(id) {
    await db.read();
    return db.data.readings.find((reading) => reading._id === id);
  },
  
  async getMostRecentReadingByStationId(stationid) {
    await db.read();
    const stationReadings = await readingStore.getReadingsByStationId(stationid);
    let findings = null;
    if ((stationReadings.length < 1) || (stationReadings.length === undefined)){
      findings = {
        _id: v4(),
        stationid: stationid,
        code: 0,
        temperature: 0,
        windSpeed: 0,
        windDirection: 0,
        pressure : 0,
        time: "Placeholder",
      }
    } else {
      findings = stationReadings.slice(-1)[0]; 
    }
    const latestReading = {
      code: findings.code,
      temperature: findings.temperature,
      windSpeed: findings.windSpeed,
      windDirection: findings.windDirection,
      pressure: findings.pressure,
      time: findings.time,
      _id: findings._id,
      stationid: stationid,
    }
    return latestReading;  
  },

  async deleteReading(id) {
    await db.read();
    const index = db.data.readings.findIndex((reading) => reading._id === id);
    db.data.readings.splice(index, 1);
    await db.write();
  },
  
    async deleteAllReadingsWithStationId(stationid) {
    await db.read();
    const list = await readingStore.getReadingsByStationId(stationid);
    for (let i = 0; i < list.length; i++) {
    await readingStore.deleteReading(list[i]._id);
    }
  },

  async deleteAllReadings() {
    db.data.readings = [];
    await db.write();
  },

  async updateReading(reading, updatedReading) {
    reading.code = updatedReading.code;
    reading.temperature = updatedReading.temperature;
    reading.windSpeed = updatedReading.windSpeed;
    reading.windDirection = updatedReading.windDirection;
    reading.pressure = updatedReading.pressure;
    reading.time = updatedReading.time;
    await db.write();
  },
};