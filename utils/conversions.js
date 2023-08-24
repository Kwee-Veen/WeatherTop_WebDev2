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
    return (13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * (Math.pow(windSpeed, 0.16))));
  }
  
}