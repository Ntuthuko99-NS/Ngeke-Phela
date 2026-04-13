// A single listing card component
export default function ListingCard({ listing, onSave }) {

  // Track if item is saved (liked)
  const [isSaved, setIsSaved] = useState(false);

  // Track image errors
  const [imageError, setImageError] = useState(false);


  // When user clicks the heart button
  function handleSave(event) {
    event.preventDefault(); // stop link click
    event.stopPropagation();

    // Toggle saved state
    const newState = !isSaved;
    setIsSaved(newState);

    // Call parent function if provided
    if (newState && onSave) {
      onSave(listing);
    }
  }


  // Get first image
  const image = listing.images?.[0];


  return (
    <Link to={`/listing/${listing.id}`} className="card">

      {/* ================= IMAGE ================= */}
      <div className="image-box">

        {image && !imageError ? (
          <img
            src={image}
            alt={listing.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="no-image">📷</div>
        )}

        {/* Save / Heart button */}
        <button onClick={handleSave} className="save-button">
          <Heart className={isSaved ? "saved" : "not-saved"} />
        </button>

        {/* Featured badge */}
        {listing.is_promoted && (
          <span className="badge">Featured</span>
        )}

        {/* Sold overlay */}
        {listing.status === "sold" && (
          <div className="sold-overlay">
            <span>SOLD</span>
          </div>
        )}
      </div>


      {/* ================= DETAILS ================= */}
      <div className="details">

        {/* Price + condition */}
        <div className="top-row">
          <p className="price">
            {formatZAR(listing.price_cents)}
          </p>

          {listing.condition && (
            <span className="condition">
              {listing.condition}
            </span>
          )}
        </div>

        {/* Title */}
        <p className="title">
          {listing.title}
        </p>

        {/* Location + time */}
        <div className="info">
          <span>
            <MapPin /> {listing.suburb}
          </span>

          <span>
            <Clock /> {timeAgo(listing.created_date)}
          </span>
        </div>

      </div>
    </Link>
  );
}
