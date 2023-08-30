import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { stationAnalytics } from "../utils/station-analytics.js";

export const dashboardController = {
  
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    let stations = await stationStore.getStationsByUserId(loggedInUser._id);
    for (let i = 0; i < stations.length; i++) {
      await stationAnalytics.updateWeather(stations[i]._id); 
    }
    stations = await stationStore.getStationsByUserId(loggedInUser._id);
    let coordinateArray = Array(stations.length);
    for (let i = 0; i < stations.length; i++) {
    let output = {
        lat: stations[i].latitude,
        long: stations[i].longitude,
      };
      coordinateArray[i] = output;
    }
    const viewData = {
      title: "Station Dashboard",
      stations: stations,
      coords: coordinateArray,
    };
    console.log("dashboard rendering");
    console.log(viewData.coords);
    response.render("dashboard-view", viewData);
  },


  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
  
  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log("Deleting station ${station}");
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
