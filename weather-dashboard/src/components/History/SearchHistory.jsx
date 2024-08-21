import React, { Component } from 'react';
import { fetchSearchHistory, clearSearchHistory } from '../../utils/firebaseFunctions';
import { getAuth } from 'firebase/auth';

class SearchHistory extends Component {
  state = {
    searchHistory: [],
    loading: true,
    error: null,
  };

  async componentDidMount() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not logged in');
      this.setState({ loading: false, error: 'User is not logged in' });
      return;
    }

    const userId = user.uid;

    try {
      const history = await fetchSearchHistory(userId);
      this.setState({ searchHistory: history, loading: false });
    } catch (error) {
      console.error('Failed to fetch search history:', error);
      this.setState({ loading: false, error: error.message });
    }
  }

  handleClearHistory = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const userId = user.uid;

    try {
      await clearSearchHistory(userId);
      this.setState({ searchHistory: [], error: null });
    } catch (error) {
      console.error('Failed to clear search history:', error);
      this.setState({ error: 'Failed to clear search history' });
    }
  };

  render() {
    const { searchHistory, loading, error } = this.state;

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg font-semibold text-gray-700">Loading...</div>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg max-w-2xl mt-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Search History</h1>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={this.handleClearHistory}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
          >
            Clear History
          </button>
        </div>
        <ul className="space-y-4">
          {searchHistory.length > 0 ? (
            searchHistory.map((item) => (
              <li
                key={item.id}
                className="bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition-colors duration-300"
              >
                <div className="text-gray-800 font-semibold">{item.cityName}</div>
                <div className="text-gray-600 text-sm">{new Date(item.timestamp).toLocaleString()}</div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No search history found.</p>
          )}
        </ul>
      </div>
    );
  }
}

export default SearchHistory;
