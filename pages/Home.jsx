import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, SlidersHorizontal, TrendingUp } from "lucide-react"
import axios from "axios"

import CategoryPills from "../components/listings/CategoryPills"
import ListingGrid from "../components/listings/ListingGrid"
import { CATEGORIES } from "../lib/utils-marketplace"

export default function Home() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Load listings whenever category changes
  useEffect(() => {
    loadListings()
  }, [selectedCategory])

  async function loadListings() {
    try {
      setLoading(true)

      const params = {
        status: "active",
      }

      if (selectedCategory) {
        params.category = selectedCategory
      }

      const { data } = await axios.get("/api/listings", {
        params,
      })

      setListings(data)
    } catch (error) {
      console.error("Failed to load listings:", error)
      setListings([])
    } finally {
      setLoading(false)
    }
  }

  // Simple client-side search filter
  const filteredListings = searchQuery
    ? listings.filter((item) => {
        const query = searchQuery.toLowerCase()

        return (
          item.title?.toLowerCase().includes(query) ||
          item.suburb?.toLowerCase().includes(query)
        )
      })
    : listings

  const promotedListings = filteredListings.filter((l) => l.is_promoted)
  const regularListings = filteredListings.filter((l) => !l.is_promoted)

  return (
    <div className="space-y-5">

      {/* Header + search */}
      <div className="space-y-3">
        <div>
          <h1 className="text-2xl font-bold">
            Discover deals near you
          </h1>
          <p className="text-sm text-gray-500">
            Buy & sell in your neighbourhood 🇿🇦
          </p>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search items, suburbs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-9 pr-4 rounded-xl border bg-white text-sm focus:outline-none"
            />
          </div>

          <Link
            to="/search"
            className="w-11 h-11 flex items-center justify-center border rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Category filter */}
      <CategoryPills
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Quick category shortcuts */}
      {!selectedCategory && !searchQuery && (
        <div className="grid grid-cols-4 gap-2">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className="flex flex-col items-center p-3 border rounded-xl hover:shadow-sm"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs text-gray-500 text-center">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* Featured listings */}
          {promotedListings.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                Featured
              </div>

              <ListingGrid listings={promotedListings} />
            </div>
          )}

          {/* Regular listings */}
          <div className="space-y-2">
            <h2 className="text-sm font-medium">
              {selectedCategory || "Latest listings"}
            </h2>

            <ListingGrid listings={regularListings} />
          </div>
        </>
      )}
    </div>
  )
}
