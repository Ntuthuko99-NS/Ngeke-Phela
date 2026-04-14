import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Star,
  Package,
  Shield,
  LogOut,
  Heart,
} from "lucide-react"
import axios from "axios"

import { formatZAR } from "../lib/utils-marketplace"
import ListingGrid from "../components/listings/ListingGrid"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Profile() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [myListings, setMyListings] = useState([])
  const [savedListings, setSavedListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      setLoading(true)

      const userRes = await axios.get("/api/auth/me")
      const me = userRes.data
      setUser(me)

      const [listingsRes, savedRes] = await Promise.all([
        axios.get("/api/listings", {
          params: { created_by: me.email },
        }),
        axios.get("/api/saved-listings", {
          params: { created_by: me.email },
        }),
      ])

      setMyListings(listingsRes.data)
      setSavedListings(savedRes.data)
    } catch (error) {
      console.error("Failed to load profile:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await axios.post("/api/auth/logout")
      setUser(null)
      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-7 h-7 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    )
  }

  const activeListings = myListings.filter(
    (l) => l.status === "active"
  )

  const soldListings = myListings.filter(
    (l) => l.status === "sold"
  )

  return (
    <div className="space-y-5">

      {/* Profile header */}
      <div className="border rounded-2xl p-5 bg-white">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold">
            {(user?.full_name || user?.email || "?")[0].toUpperCase()}
          </div>

          <div className="flex-1">

            <h1 className="text-lg font-bold flex items-center gap-1">
              {user?.full_name || user?.email}
              <Shield className="w-4 h-4 text-blue-500" />
            </h1>

            <p className="text-xs text-gray-500">
              {user?.email}
            </p>

            <div className="flex gap-3 text-xs text-gray-500 mt-1">

              <span className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                {myListings.length} listings
              </span>

              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500" />
                New seller
              </span>

            </div>

          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">

        <div className="border rounded-xl p-3 text-center">
          <p className="text-xl font-bold">{activeListings.length}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>

        <div className="border rounded-xl p-3 text-center">
          <p className="text-xl font-bold">{soldListings.length}</p>
          <p className="text-xs text-gray-500">Sold</p>
        </div>

        <div className="border rounded-xl p-3 text-center">
          <p className="text-xl font-bold">{savedListings.length}</p>
          <p className="text-xs text-gray-500">Saved</p>
        </div>

      </div>

      {/* Tabs */}
      <Tabs defaultValue="listings">

        <TabsList className="w-full">
          <TabsTrigger value="listings" className="flex-1">
            My Listings
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">
            Saved
          </TabsTrigger>
        </TabsList>

        {/* My Listings */}
        <TabsContent value="listings">
          <ListingGrid listings={myListings} />
        </TabsContent>

        {/* Saved */}
        <TabsContent value="saved">

          {savedListings.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-8 h-8 mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">
                No saved items yet
              </p>
            </div>
          ) : (
            <div className="space-y-2">

              {savedListings.map((item) => (
                <Link
                  key={item.id}
                  to={`/listing/${item.listing_id}`}
                  className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50"
                >

                  {item.listing_image ? (
                    <img
                      src={item.listing_image}
                      className="w-12 h-12 rounded-lg object-cover"
                      alt=""
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      📷
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.listing_title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.listing_suburb}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-blue-600">
                    {formatZAR(item.listing_price_cents)}
                  </p>

                </Link>
              ))}

            </div>
          )}

        </TabsContent>

      </Tabs>

      {/* Logout */}
      <Button
        onClick={handleLogout}
        variant="ghost"
        className="w-full justify-start text-red-500"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>

    </div>
  )
}
