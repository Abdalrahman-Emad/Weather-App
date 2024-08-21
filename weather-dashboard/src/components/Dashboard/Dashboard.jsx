import React, { Component } from 'react';
import CityInputForm from '../CityInputForm';
import sunnyBg from '../../assets/sunny-bg.jpg';
import cloudyIcon from '../../assets/cloudy-icon.png';
import sunIcon from '../../assets/sun.png';
import clearIcon from '../../assets/clear-sky.png';
import rainingIcon from '../../assets/raining.png';
import './Dashboard.css'; // Import custom CSS for animations

class Dashboard extends Component {
  state = {
    weatherData: null,
    fiveDayForecast: null,
  };

  handleWeatherData = (weatherData, fiveDayForecast) => {
    this.setState({ weatherData, fiveDayForecast });
  };

  render() {
    const { weatherData, fiveDayForecast } = this.state;

    // Determine the weather icon based on current weather condition
    const weatherCondition = weatherData?.weather[0].main.toLowerCase();
    let weatherIcon;
    switch (weatherCondition) {
      case 'clouds':
        weatherIcon = cloudyIcon;
        break;
      case 'clear':
        weatherIcon = clearIcon;
        break;
      case 'sunny':
        weatherIcon = sunIcon;
        break;
      default:
        weatherIcon = rainingIcon;
    }

    return (
      <div
        className="min-h-screen p-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${sunnyBg})` }}
      >
        <div className="container mx-auto p-4 max-w-md bg-white shadow-lg rounded-lg backdrop-filter backdrop-blur-sm bg-opacity-70">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Weather Dashboard</h1>
          <CityInputForm onWeatherData={this.handleWeatherData} />
          {weatherData && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                Weather in {weatherData.name}
              </h2>
              <div className="flex items-center">
                <img src={weatherIcon} alt="Weather Icon" className="w-24 h-24 mr-4 animate__animated animate__fadeIn" />
                <div>
                  <p className="mb-2">
                    <span className="font-bold">Temperature:</span> {(weatherData.main.temp - 273.15).toFixed(2)} °C
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Weather:</span> {weatherData.weather[0].description}
                  </p>
                  <p className="mb-2">
                    <span className="font-bold">Humidity:</span> {weatherData.main.humidity}%
                  </p>
                  <p>
                    <span className="font-bold">Wind Speed:</span> {weatherData.wind.speed} m/s
                  </p>
                </div>
              </div>
              
            </div>
          )}
          {fiveDayForecast && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5-Day Forecast:</h3>
              <div className="flex overflow-x-auto space-x-4">
                {fiveDayForecast.list.filter((_, index) => index % 8 === 0).map((forecast, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-sm animate__animated animate__fadeIn"
                    style={{ flex: '0 0 auto', width: '200px' }}
                  >
                    <p className="text-sm font-medium">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                      alt={forecast.weather[0].description}
                      className="w-16 h-16"
                    />
                    <p className="text-sm">{Math.round(forecast.main.temp - 273.15)}°C</p>
                    <p className="text-xs text-gray-600">{forecast.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
