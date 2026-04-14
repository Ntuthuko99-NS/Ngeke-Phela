import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Camera, X } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"

import { CATEGORIES, PROVINCES, CONDITIONS } from "../lib/utils-marketplace"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function PostListing() {
  const navigate = useNavigate()

  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState([])

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    suburb: "",
    province: "",
    delivery_option: "Pickup Only",
    payment_methods: ["Cash"],
    seller_phone: "",
  })

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // Upload images
  async function handleImageUpload(e) {
    const files = Array.from(e.target.files)

    if (images.length + files.length > 10) {
      toast.error("Maximum 10 images allowed")
      return
    }

    try {
      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)

        const { data } = await axios.post("/api/upload", formData)

        setImages((prev) => [...prev, data.url])
      }
    } catch (error) {
      console.error("Image upload failed:", error)
      toast.error("Failed to upload image")
    }
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  function togglePayment(method) {
    setForm((prev) => ({
      ...prev,
      payment_methods: prev.payment_methods.includes(method)
        ? prev.payment_methods.filter((m) => m !== method)
        : [...prev.payment_methods, method],
    }))
  }

  // Submit listing
  async function handleSubmit() {
    if (
      !form.title ||
      !form.price ||
      !form.category ||
      !form.suburb ||
      !form.province
    ) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      setSaving(true)

      const userRes = await axios.get("/api/auth/me")
      const user = userRes.data

      await axios.post("/api/listings", {
        title: form.title,
        description: form.description,
        price_cents: Math.round(parseFloat(form.price) * 100),
        category: form.category,
        condition: form.condition || "Good",
        images,
        suburb: form.suburb,
        province: form.province,
        delivery_option: form.delivery_option,
        payment_methods: form.payment_methods,
        seller_name: user.full_name || user.email,
        seller_phone: form.seller_phone,
        status: "active",
        is_promoted: false,
        views_count: 0,
      })

      toast.success("Listing posted!")
      navigate("/")
    } catch (error) {
      console.error("Failed to post listing:", error)
      toast.error("Failed to post listing")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-xl font-bold">Post an Item</h1>
      </div>

      {/* Images */}
      <div>
        <Label className="text-xs mb-2 block">
          Photos (up to 10)
        </Label>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded-lg overflow-hidden border"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}

          {images.length < 10 && (
            <label className="w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer">
              <Camera className="w-5 h-5 text-gray-400" />
              <span className="text-[10px] text-gray-400">Add</span>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">

        <div>
          <Label className="text-xs">Title *</Label>
          <Input
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-xs">Description</Label>
          <Textarea
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="mt-1 min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div>
            <Label className="text-xs">Price (R) *</Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => updateField("price", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs">Category *</Label>
            <Select
              value={form.category}
              onValueChange={(v) => updateField("category", v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.name} value={c.name}>
                    {c.icon} {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div>
            <Label className="text-xs">Condition</Label>
            <Select
              value={form.condition}
              onValueChange={(v) => updateField("condition", v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                {CONDITIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs">Delivery</Label>
            <Select
              value={form.delivery_option}
              onValueChange={(v) =>
                updateField("delivery_option", v)
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Pickup Only">
                  Pickup Only
                </SelectItem>
                <SelectItem value="Delivery Available">
                  Delivery Available
                </SelectItem>
                <SelectItem value="Both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div>
            <Label className="text-xs">Suburb *</Label>
            <Input
              value={form.suburb}
              onChange={(e) => updateField("suburb", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-xs">Province *</Label>
            <Select
              value={form.province}
              onValueChange={(v) => updateField("province", v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent>
                {PROVINCES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-xs">
            WhatsApp Number (optional)
          </Label>
          <Input
            value={form.seller_phone}
            onChange={(e) =>
              updateField("seller_phone", e.target.value)
            }
            className="mt-1"
          />
        </div>

        {/* Payment methods */}
        <div>
          <Label className="text-xs mb-2 block">
            Payment Methods
          </Label>

          <div className="flex gap-2">
            {["Cash", "EFT", "SnapScan"].map((m) => (
              <button
                key={m}
                onClick={() => togglePayment(m)}
                className={`px-4 py-2 rounded-lg text-xs border ${
                  form.payment_methods.includes(m)
                    ? "bg-black text-white"
                    : "bg-white text-gray-500"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full h-12"
        >
          {saving ? "Posting..." : "Post Listing"}
        </Button>
      </div>
    </div>
  )
}
