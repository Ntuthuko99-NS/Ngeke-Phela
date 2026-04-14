import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  ArrowLeft,
  MapPin,
  Share2,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Phone,
} from "lucide-react"
import axios from "axios"

import { formatZAR, timeAgo } from "../lib/utils-marketplace"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [saved, setSaved] = useState(false)
  const [user, setUser] = useState(null)

  // Load listing + user
  useEffect(() => {
    loadData()
  }, [id])

  async function loadData() {
    try {
      setLoading(true)

      const [listingRes, userRes] = await Promise.all([
        axios.get(`/api/listings/${id}`),
        axios.get(`/api/auth/me`).catch(() => null),
      ])

      setListing(listingRes.data)
      setUser(userRes?.data || null)
    } catch (error) {
      console.error("Failed to load listing:", error)
      setListing(null)
    } finally {
      setLoading(false)
    }
  }

  // Start or open chat
  async function handleContact() {
    if (!listing || !user) return

    try {
      const { data } = await axios.post(`/api/conversations`, {
        listing_id: listing.id,
        buyer_email: user.email,
      })

      navigate(`/messages/${data.id}`)
    } catch (error) {
      console.error("Failed to start conversation:", error)
    }
  }

  // WhatsApp contact
  function handleWhatsApp() {
    if (!listing?.seller_phone) return

    const phone = listing.seller_phone.replace(/\D/g, "")
    const message = encodeURIComponent(
      `Hi, I'm interested in your listing: ${listing.title} (${formatZAR(
        listing.price_cents
      )})`
    )

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-7 h-7 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Listing not found</p>
        <Link to="/" className="text-blue-500 text-sm mt-2 inline-block">
          Go back home
        </Link>
      </div>
    )
  }

  const images = listing.images || []

  return (
    <div className="space-y-4 -mx-4 sm:mx-0">

      {/* Image carousel */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden sm:rounded-xl">
        {images.length > 0 ? (
          <img
            src={images[currentImage]}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">
            📷
          </div>
        )}

        {/* Top controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setSaved(!saved)}
              className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center"
            >
              <Heart
                className={`w-4 h-4 ${
                  saved ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>

            <button className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentImage((p) => (p > 0 ? p - 1 : images.length - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                setCurrentImage((p) => (p < images.length - 1 ? p + 1 : 0))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* SOLD overlay */}
        {listing.status === "sold" && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white px-6 py-2 rounded-full font-bold">
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="px-4 space-y-4">

        <div>
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">
              {formatZAR(listing.price_cents)}
            </h1>

            <Badge>{listing.condition || "Used"}</Badge>
          </div>

          <h2 className="text-gray-700">{listing.title}</h2>

          <div className="flex gap-3 text-xs text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {listing.suburb}, {listing.province}
            </span>
            <span>{timeAgo(listing.created_date)}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{listing.category}</Badge>

          {listing.payment_methods?.map((m) => (
            <Badge key={m} variant="outline">
              {m}
            </Badge>
          ))}

          {listing.delivery_option && (
            <Badge variant="outline">{listing.delivery_option}</Badge>
          )}
        </div>

        {/* Description */}
        {listing.description && (
          <div>
            <h3 className="font-semibold text-sm mb-1">Description</h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {listing.description}
            </p>
          </div>
        )}

        {/* Seller */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
            {(listing.seller_name || listing.created_by || "?")[0]}
          </div>

          <div>
            <p className="text-sm font-medium flex items-center gap-1">
              {listing.seller_name || listing.created_by}
              <Shield className="w-3.5 h-3.5 text-blue-500" />
            </p>
            <p className="text-xs text-gray-500">
              Member since{" "}
              {new Date(listing.created_date).getFullYear()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pb-4">
          <Button onClick={handleContact} className="flex-1 h-12">
            <MessageCircle className="w-4 h-4 mr-2" />
            Message Seller
          </Button>

          {listing.seller_phone && (
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              className="h-12 text-green-600 border-green-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          )}
        </div>

      </div>
    </div>
  )
}
