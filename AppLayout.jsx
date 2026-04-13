// Navigation items (what appears in the menu)
const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/search", label: "Search", icon: Search },
  { path: "/post", label: "Sell", icon: PlusCircle },
  { path: "/messages", label: "Chat", icon: MessageCircle },
  { path: "/profile", label: "Profile", icon: User },
];


// Main layout for the app
export default function AppLayout() {

  // Get current page URL
  const location = useLocation();

  return (
    <div className="app-container">

      {/* ================= HEADER ================= */}
      <header className="header">

        {/* Logo + title */}
        <Link to="/" className="logo">
          <SAFlag />
          <span>Marketplace</span>
        </Link>

        {/* Desktop navigation */}
        <div className="desktop-nav">
          {navItems.map(item => {

            // Check if this tab is active
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={isActive ? "active-link" : "link"}
              >
                <item.icon />
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>


      {/* ================= PAGE CONTENT ================= */}
      <main className="content">
        {/* This is where pages render */}
        <Outlet />
      </main>


      {/* ================= MOBILE NAV ================= */}
      <nav className="mobile-nav">

        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const isSellButton = item.path === "/post";

          return (
            <Link
              key={item.path}
              to={item.path}
              className={
                isSellButton
                  ? "sell-button"
                  : isActive
                  ? "active-mobile"
                  : "mobile-link"
              }
            >
              <item.icon />

              {/* Show text only if NOT the sell button */}
              {!isSellButton && <span>{item.label}</span>}
            </Link>
          );
        })}

      </nav>
    </div>
  );
}


// Small South African flag component (logo)
function SAFlag() {
  return (
    <div className="flag">
      <div className="green-top" />
      <div className="yellow-line" />
      <div className="middle">
        <div className="red" />
        <div className="blue" />
      </div>
      <div className="yellow-line" />
      <div className="green-bottom" />
    </div>
  );
}
