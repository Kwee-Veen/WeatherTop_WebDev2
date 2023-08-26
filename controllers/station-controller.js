import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const stationController = {
  
  async index(request, response) {
    await stationAnalytics.updateWeather(request.params.id);
    let station = [];
    station[0] = await stationStore.getStationById(request.params.id);
    let readings = await stationStore.getStationByIdWithReadings(request.params.id);
    const viewData = {
      title: station.title,
      station: station,
      readings: readings.readings,
      stationid: station._id,
    };
    console.log(`Rendering station view`);
    response.render("station-view", viewData);
  },
  
  async addReading(request, response) {
    let station = await stationStore.getStationByIdWithReadings(request.params.id);
    const now = new Date();
    const newReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windspeed),
      windDirection: Number(request.body.winddirection),
      pressure: Number(request.body.pressure),
      time: now.toLocaleString('en-GB', { timeZone: 'UTC' }),
    };
    await readingStore.addReading(station._id, newReading);
    console.log(`adding reading at time ${newReading.time}`);
    response.redirect("/station/" + station._id);
  },
  
  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log (`Deleting reading ${readingId} from station ${stationId}`);
    await readingStore.deleteReading(readingId);
    response.redirect("/station/" + stationId);
  },
};