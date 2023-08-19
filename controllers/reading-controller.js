import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { latestReadingStore } from "../models/latest-reading-store.js";

export const readingController = {
  async index(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Reading",
      station: await stationStore.getStationById(stationId),
      reading: await readingStore.getReadingById(readingId),
    };
    response.render("reading-view", viewData);
  },
  
  async update(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    const now = new Date();
    const updatedReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windspeed),
      windDirection: Number(request.body.winddirection),
      pressure: Number(request.body.pressure),
      time: now.toLocaleString('en-GB', { timeZone: 'UTC' }),
    };
    console.log(`Updating Reading ${readingId} from Station ${stationId}`);
    const reading = await readingStore.getReadingById(readingId);
    await readingStore.updateReading(reading, updatedReading);
    response.redirect("/station/" + stationId);
  },
};