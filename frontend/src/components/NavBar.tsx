import { UserButton } from "@clerk/clerk-react";
import { NavLink, Link } from "react-router-dom";

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) &&
  !String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY).includes("placeholder");

export function NavBar() {
  return (
    <header className="topbar">
      <Link to="/" className="brandmark">
        <span className="brandmark__badge">PG</span>
        <div>
          <strong>PlateGallery</strong>
          <span>Vanity plate Americana</span>
        </div>
      </Link>

      <nav className="main-nav" aria-label="Primary">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
      </nav>

      <div className="topbar__actions">
        <Link to="/upload" className="button button--amber">
          Submit a Plate
        </Link>
        {clerkEnabled ? <UserButton /> : <Link to="/sign-in" className="button button--ghost">Sign in</Link>}
      </div>
    </header>
  );
}

