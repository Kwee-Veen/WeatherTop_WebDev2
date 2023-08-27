import { stationStore } from "../models/station-store.js";


export const dataTrends = {
  async checkTrends(stationid) {
    const station = await stationStore.getStationByIdWithReadings(stationid);
    const upTrend = "icon-park-twotone:up-two";
    const downTrend = "icon-park-twotone:down-two";
    let results = {
        tempTrend: "",
        windTrend: "",
        pressureTrend: ""
      }
    if (station.readings.length < 3) {
      return results
    }
    
    let readings = Array(3);
    for (let i = 0; i < readings.length; i++) {
      readings[i] = station.readings[i];
    }
    for (let i = 0; i < station.readings.length; i++) {
      readings[0] = readings[1];
      readings[1] = readings[2];
      readings[2] = station.readings[i];
    }
        
    if ((readings[0].temperature < readings[1].temperature) && (readings[1].temperature < readings[2].temperature))
      results.tempTrend = upTrend;
    else if ((readings[0].temperature > readings[1].temperature) && (readings[1].temperature > readings[2].temperature))
      results.tempTrend = downTrend;

    if ((readings[0].windSpeed < readings[1].windSpeed) && (readings[1].windSpeed < readings[2].windSpeed))
      results.windTrend = upTrend;
    else if ((readings[0].windSpeed > readings[1].windSpeed) && (readings[1].windSpeed > readings[2].windSpeed))
      results.windTrend = downTrend;

    if ((readings[0].pressure < readings[1].pressure) && (readings[1].pressure < readings[2].pressure))
      results.pressureTrend = upTrend;
    else if ((readings[0].pressure > readings[1].pressure) && (readings[1].pressure > readings[2].pressure))
      results.pressureTrend = downTrend;
    
    return results
  }
  
}