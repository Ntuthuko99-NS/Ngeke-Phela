import { useState, useEffect } from "react";
import { ArrowLeft, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import ListingGrid from "../components/listings/ListingGrid";
import { CATEGORIES, PROVINCES } from "../lib/utils-marketplace";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Replace this with your backend (Supabase / Firebase / REST API)
 */
const api = {
  listing: {
    search: async ({ filters, sort }) => {
      return [];
    },
  },
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [province, setProvince] = useState("all");
  const [sort, setSort] = useState("-created_date");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchListings();
  }, [category, province, sort]);

  const searchListings = async () => {
    setLoading(true);

    const filters = {
      status: "active",
    };

    if (category !== "all") filters.category = category;
    if (province !== "all") filters.province = province;

    const data = await api.listing.search({
      filters,
      sort,
      limit: 50,
    });

    setListings(data);
    setLoading(false);
  };

  const filteredListings = query
    ? listings.filter((item) => {
        const q = query.toLowerCase();

        return (
          item.title?.toLowerCase().includes(q) ||
          item.suburb?.toLowerCase().includes(q) ||
          item.description?.toLowerCase().includes(q)
        );
      })
    : listings;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/" className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </Link>

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search listings..."
            autoFocus
            className="w-full h-10 pl-9 pr-8 rounded-xl border bg-secondary/60 text-sm"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {/* Category */}
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.name} value={c.name}>
                {c.icon} {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Province */}
        <Select value={province} onValueChange={setProvince}>
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="Province" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Provinces</SelectItem>
            {PROVINCES.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-created_date">Newest</SelectItem>
            <SelectItem value="price_cents">Cheapest</SelectItem>
            <SelectItem value="-price_cents">Most Expensive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-7 h-7 border-2 border-muted border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div>
          <p className="text-xs text-muted-foreground mb-3">
            {filteredListings.length} results
          </p>

          <ListingGrid listings={filteredListings} />
        </div>
      )}
    </div>
  );
}
