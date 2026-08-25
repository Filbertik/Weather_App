export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface Clouds {
  all: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface SystemInfo {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CurrentWeather {
  coord: Coordinates;
  weather: WeatherCondition[];
  main: MainWeather;
  wind: Wind;
  clouds: Clouds;
  visibility: number;
  name: string;
  timezone: number;
  sys: SystemInfo;
}
