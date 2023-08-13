import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
// import { playlistAnalytics } from "../utils/playlist-analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    // const shortestTrack = playlistAnalytics.getShortestTrack(playlist);    
    const viewData = {
      title: station.title,
      station: station,
      // shortestTrack: shortestTrack,
    };
    console.log(`rendering station ${viewData.title}`);
    response.render("station-view", viewData);
  },
  
  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const now = new Date();
    const newReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windspeed),
      windDirection: Number(request.body.winddirection),
      pressure: Number(request.body.pressure),
      time: now.toLocaleString('en-GB', { timeZone: 'UTC' }),
    };
    console.log(`adding reading at time ${newReading.time}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },
  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log (`Deleting reading ${readingId} from station ${stationId}`);
    await readingStore.deleteReading(request.params.readingId);
    response.redirect("/station/" + stationId);
  },
};