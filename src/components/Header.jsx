import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="backdrop-blur-lg bg-gray-900/80 border-b border-gray-700 shadow-2xl rounded-b-2xl py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          {/* Movie icon SVG */}
          <span 
          className="bg-yellow-400 rounded-full p-2 shadow-lg 
          animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-pink-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3.75l15 4.5M4.5 3.75v16.5m15-12v12" />
            </svg>
          </span>
          <div>
            <Link to="/" 
  className="text-4xl font-black bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
              Episode 11
            </Link>
            <div className="text-sm text-gray-300 font-medium mt-1 tracking-wide">Your Ultimate Movie Explorer</div>
          </div>
        </div>
        <nav className="flex gap-4 mt-2 md:mt-0">
          <Link to="/" className="px-5 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 font-semibold shadow hover:scale-105 transition-transform duration-200">
            Home
          </Link>
          <Link to="/watchlist" className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-yellow-400 text-gray-900 font-semibold shadow hover:scale-105 transition-transform duration-200">
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
}