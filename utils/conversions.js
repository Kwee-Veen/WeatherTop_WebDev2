export const dataConversions = {
  async windSpeedToBeaufort(windSpeed) {
    let beaufort = 0;
    if (windSpeed < 1) {
      beaufort = 0;
    } else if (windSpeed <= 5) {
      beaufort = 1;
    } else if (windSpeed <= 11) {
      beaufort = 2;
    } else if (windSpeed <= 19) {
      beaufort = 3;
    } else if (windSpeed <= 28) {
      beaufort = 4;
    } else if (windSpeed <= 38) {
      beaufort = 5;
    } else if (windSpeed <= 49) {
      beaufort = 6;
    } else if (windSpeed <= 61) {
      beaufort = 7;
    } else if (windSpeed <= 74) {
      beaufort = 8;
    } else if (windSpeed <= 88) {
      beaufort = 9;
    } else if (windSpeed <= 102) {
      beaufort = 10;
    } else if (windSpeed <= 117) {
      beaufort = 11;
    }
    return beaufort;
  },
  
  async rounder(number) {
    return Math.round(number * 100) / 100;
  },
  
  async celsiusToFahrenheit(celsius) {
    return (((celsius * 9) / 5) + 32);
  },
  
   async getWindDirection(windDirectionDegrees) {
    let windDirection = "";
    if (((windDirectionDegrees <= 11.25) && (windDirectionDegrees >= 0)) || ((windDirectionDegrees >= 348.75) && (windDirectionDegrees <= 360))) {
      windDirection = "N";
    } else if (windDirectionDegrees <= 33.75) {
      windDirection = "NNE";
    } else if (windDirectionDegrees <= 56.25) {
      windDirection = "NE";
    } else if (windDirectionDegrees <= 78.75) {
      windDirection = "ENE";
    } else if (windDirectionDegrees <= 101.25) {
      windDirection = "E";
    } else if (windDirectionDegrees <= 123.75) {
      windDirection = "ESE";
    } else if (windDirectionDegrees <= 146.25) {
      windDirection = "SE";
    } else if (windDirectionDegrees <= 168.75) {
      windDirection = "SSE";
    } else if (windDirectionDegrees <= 191.25) {
      windDirection = "S";
    } else if (windDirectionDegrees <= 213.75) {
      windDirection = "SSW";
    } else if (windDirectionDegrees <= 236.25) {
      windDirection = "SW";
    } else if (windDirectionDegrees <= 258.75) {
      windDirection = "WSW";
    } else if (windDirectionDegrees <= 281.25) {
      windDirection = "W";
    } else if (windDirectionDegrees <= 303.75) {
      windDirection = "WNW";
    } else if (windDirectionDegrees <= 326.25) {
      windDirection = "NW";
    } else if (windDirectionDegrees <= 348.75) {
      windDirection = "NNW";
    }
    return windDirection;
  },
  
  async getWindChill(temperature, windSpeed) {
    return Math.round((13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * (Math.pow(windSpeed, 0.16)))) * 100) / 100;
  },
  // async getWeather(code) {
  //   switch (code) {
  //     case 100:
  //       return {
  //         weather: "Clear",
  //         icon: `solar:sun-bold-duotone`,
  //       }
  //     case 200:
  //       return {
  //         weather: "Partial Clouds",
  //         icon: "ph:cloud-sun",
  //       }
  //     case 300:
  //       return {
  //         weather: "Cloudy",
  //         icon: "solar:cloud-line-duotone",
  //       }
  //     case 400:
  //       return {
  //         weather: "Light Rain",
  //         icon: "wi:rain-wind",
  //       }
  //     case 500:
  //       return {
  //         weather: "Heavy Shower",
  //         icon: "bi:cloud-rain-fill",
  //       }
  //     case 600:
  //       return {
  //         weather: "Rain",
  //         icon: "carbon:rain",
  //       }
  //     case 700:
  //       return {
  //         weather: "Snow",
  //         icon: "wpf:snow",
  //       }
  //     case 800:
  //       return {
  //         weather: "Thunder",
  //         icon: "mdi:weather-thunder",
  //       }
  //     default:
  //       return {
  //         weather: "Weather Unknown",
  //         icon: "ps:radio-empty",
  //       }
  //   }
  async getWeather(code) {
    switch (code) {
      case 100:
        return {
          weather: "Clear",
          icon: `solar:sun-bold-duotone`,
        }
      case 200:
      case 801:
      case 802:
        return {
          weather: "Partial Clouds",
          icon: "ph:cloud-sun",
        }
      case 300:
      case 803: 
      case 804:
        return {
          weather: "Cloudy",
          icon: "solar:cloud-line-duotone",
        }
      case 400:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
        return {
          weather: "Light Rain",
          icon: "wi:rain-wind",
        }
      case 500:
      case 502:
      case 503:
      case 504:
      case 511:
      case 520:
      case 522:
        return {
          weather: "Heavy Shower",
          icon: "bi:cloud-rain-fill",
        }
      case 600:
      case 501:
      case 521:
      case 531:
        return {
          weather: "Rain",
          icon: "carbon:rain",
        }
      case 700:
      case 601:
      case 602:
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
        return {
          weather: "Snow",
          icon: "wpf:snow",
        }
      case 800:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
      case 230:
      case 231:
      case 232:
        return {
          weather: "Thunder",
          icon: "mdi:weather-thunder",
        }
      default:
        return {
          weather: "Weather Unknown",
          icon: "ps:radio-empty",
        }
    }
  }
}