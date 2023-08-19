import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { readingStore } from "./reading-store.js";

const db = initStore("latestReadings");

export const latestReadingStore = {

  async addLatestReading(stationId, latestReading) {
    latestReadingStore.deleteLatestReading(stationId);
    await db.read();
    latestReading._id = v4();
    latestReading.stationid = stationId;
    db.data.latestReading.push(latestReading);
    await db.write();
    return latestReading;
  },
  
  async addLatestReading(stationId) {
    await db.read();
      const latestReading = {      
      code: Number(0),
      temperature:  Number(0),
      windSpeed:  Number(0),
      windDirection:  Number(0),
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
    return db.data.latestReading.filter((latestReading) => latestReading.stationid === stationId);
  },
  
    async deleteLatestReading(stationId) {
    await db.read();
    const index = db.data.latestReading.findIndex((latestReading) => latestReading._stationId === stationId);
    db.data.latestReading.splice(index, 1);
    console.log(`Deleted the last latest reading for station ${stationId}`);
    await db.write();
  },
  
    async deleteAllLatestReadings() {
    db.data.latestReading = [];
    await db.write();
  },
};