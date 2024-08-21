import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/Profile/UserProfile';
import SearchHistory from './components/History/SearchHistory';
import SignUp from './components/Auth/Signup';
import SignIn from './components/Auth/SignIn';
import NotFound from './components/NotFound/NotFoundPage';



class App extends Component {
  state = {
    user: null,
    loading: true,
  };

  componentDidMount() {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      this.setState({ user, loading: false });
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/signIn" />} />
          <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/signIn" />} />
          <Route path="/history" element={user ? <SearchHistory /> : <Navigate to="/signIn" />} />
          <Route path='/signUp' element={user ? <Navigate to="/" /> : <SignUp />} />
          <Route path='/signIn' element={user ? <Navigate to="/" /> : <SignIn />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    );
  }
}

export default App;