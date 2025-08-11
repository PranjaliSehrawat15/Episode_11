import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import Header from './components/Header';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/watchlist" element={<Watchlist />} /> {/* Add this line */}

      </Routes>
    </Router>
  );
}

export default App;