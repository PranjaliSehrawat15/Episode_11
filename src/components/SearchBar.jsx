import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full md:w-64"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-pink-400 to-yellow-400 hover:scale-105 transition-transform duration-200 text-gray-900 rounded-lg font-medium"
      >
        Search
      </button>
    </form>
  )
}