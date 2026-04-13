// Simple Avatar Components


// Main avatar container
export function Avatar({ src, alt, name }) {

  // If image exists, show it
  if (src) {
    return (
      <img
        src={src}
        alt={alt || "avatar"}
        className="avatar-image"
      />
    );
  }

  // Otherwise show fallback (first letter)
  const letter = name ? name[0].toUpperCase() : "?";

  return (
    <div className="avatar-fallback">
      {letter}
    </div>
  );
}
