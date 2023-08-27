import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/reading-store.js";
import { stationAnalytics } from "../utils/station-analytics.js";
import { dataConversions } from "../utils/conversions.js";
import fetch from 'node-fetch';

export const stationController = {
  
  async index(request, response) {
    await stationAnalytics.updateWeather(request.params.id);
    let station = [];
    station[0] = await stationStore.getStationById(request.params.id);
    let readings = await stationStore.getStationByIdWithReadings(request.params.id);
    const lat = station[0].latitude;
    const long = station[0].longitude;
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
    const viewData = {
      title: station.title,
      station: station,
      readings: readings.readings,
      stationid: station._id,
      trends: trends
    };
    console.log(`Rendering station view`);
    response.render("station-view", viewData);
  },
  
  async addReading(request, response) {
    let station = await stationStore.getStationById(request.params.id);
    const now = new Date();
    const newReading = {
      code: await dataConversions.rounder(Number(request.body.code)),
      temperature: await dataConversions.rounder(Number(request.body.temperature)),
      windSpeed: await dataConversions.rounder(Number(request.body.windspeed)),
      windDirection: await dataConversions.rounder(Number(request.body.winddirection)),
      pressure: await dataConversions.rounder(Number(request.body.pressure)),
      time: now.toLocaleString('en-GB', { timeZone: 'UTC' }),
    };
    await readingStore.addReading(station._id, newReading);
    console.log(`adding reading at time ${newReading.time}`);
    response.redirect("/station/" + station._id);
  },
  
    async autoGenerateReading(request, response) {
    let station = await stationStore.getStationById(request.params.id);
    const now = new Date();
    const lat = station.latitude;
    const long = station.longitude;
    const apiKey = "0c109ad6bb8a0b5d8a284ce6061f12c6";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=` + lat + `&lon=` + long + `&appid=` + apiKey;
    const search = await fetch(url);
    const data = await search.json();
    let autoReading = undefined;
    if (data != undefined) {
      autoReading = {
      code: data.weather[0].id,
      temperature: await dataConversions.rounder(data.main.temp-273.15),
      windSpeed: await dataConversions.rounder(data.wind.speed),
      windDirection: await dataConversions.rounder(data.wind.deg),
      pressure: await dataConversions.rounder(data.main.pressure),
      time: now.toLocaleString('en-GB', { timeZone: 'UTC' }),
      }
    }
    await readingStore.addReading(station._id, autoReading);
    console.log(`Generating automatic reading at time ${autoReading.time}`);
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