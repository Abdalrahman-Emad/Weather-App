import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { saveSearchHistory } from '../utils/firebaseFunctions';
import { getAuth } from 'firebase/auth';
import { getWeatherData, getFiveDayForecast } from '../utils/weatherService';

class CityInputForm extends Component {
  state = {
    weatherData: null,
    fiveDayForecast: null,
    error: null,
    loading: false,
  };

  handleSubmit = async (values) => {
    const { cityName } = values;
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      this.setState({ error: 'You must be logged in to save search history' });
      return;
    }

    const userId = user.uid;

    this.setState({ loading: true, error: null });

    try {
      const weatherData = await getWeatherData(cityName, apiKey);
      const fiveDayForecast = await getFiveDayForecast(weatherData.coord.lat, weatherData.coord.lon, apiKey);

      await saveSearchHistory(userId, cityName);

      this.setState({ weatherData, fiveDayForecast, error: null, loading: false });
      this.props.onWeatherData(weatherData, fiveDayForecast);
    } catch (error) {
      this.setState({ weatherData: null, fiveDayForecast: null, error: error.message, loading: false });
    }
  };

  render() {
    const { error, loading } = this.state;

    return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Enter City Name</h2>
        <Formik
          initialValues={{ cityName: '' }}
          validationSchema={Yup.object({
            cityName: Yup.string()
              .required('City name is required')
              .matches(/^[a-zA-Z\s]+$/, 'City name must contain only letters'),
          })}
          onSubmit={this.handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label htmlFor="cityName" className="block text-gray-700">City Name</label>
                <Field
                  name="cityName"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter city name"
                />
                <ErrorMessage name="cityName" component="div" className="text-red-600 text-sm" />
              </div>
              <button
                type="submit"
                className={`w-full p-2 rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                disabled={loading}
              >
                {loading ? 'Fetching Weather...' : 'Get Weather'}
              </button>
            </Form>
          )}
        </Formik>

        {error && <div className="text-red-600 text-center mt-4">{error}</div>}
      </div>
    );
  }
}

export default CityInputForm;
