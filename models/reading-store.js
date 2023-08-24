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
    const stationReadings = await db.data.readings.filter((reading) => reading.stationid === stationid);
    let findings = null;
    if ((stationReadings.length < 2) || (stationReadings.length === undefined)){
      findings = stationReadings;
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
    console.log(list);
    for (let i = 0; i < list.length; i++) {
    await readingStore.deleteReading(list[i]._id);
    }
    //     console.log(list[i]._id);
    // if ((list.length < 2) || (list === undefined)) {
    //   await readingStore.deleteReading(list._id);
    //   console.log(list._id);
    //   console.log(`^ Trying to delete this. Considers this station to have had less than 2 readings.`);
    // } else {
    //   for (let i = 0; i < list.length; i++) {
    //     await readingStore.deleteReading(list[i]._id);
    //     console.log(list[i]._id);
    //     console.log(`^ Trying to delete this. Considers this station to have had 2 or more readings.`);
    //   }
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