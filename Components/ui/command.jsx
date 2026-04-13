import { useState } from "react";


// Main Command component (search box + results)
export function Command({ items = [] }) {

  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );


  return (
    <div className="command">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="command-input"
      />


      {/* Results List */}
      <div className="command-list">

        {filteredItems.length === 0 && (
          <div className="command-empty">
            No results found
          </div>
        )}

        {filteredItems.map((item, index) => (
          <div key={index} className="command-item">
            {item}
          </div>
        ))}

      </div>
    </div>
  );
}
