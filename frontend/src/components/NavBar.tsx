import { UserButton } from "@clerk/clerk-react";
import { NavLink, Link } from "react-router-dom";
import { Logo } from "./Logo";

const clerkEnabled =
  Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) &&
  !String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY).includes("placeholder");

export function NavBar() {
  return (
    <header className="topbar">
      <Link to="/" className="brandmark">
        <Logo />
        <div>
          <strong>PlateGallery</strong>
          <span>Vanity Plate Hall of Fame</span>
        </div>
      </Link>

      <nav className="main-nav" aria-label="Primary">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink to="/leaderboard">Top Plates</NavLink>
      </nav>

      <div className="topbar__actions">
        <Link to="/upload" className="button button--amber">
          + Submit a Plate
        </Link>
        {clerkEnabled ? (
          <UserButton />
        ) : (
          <Link to="/sign-in" className="button button--ghost">
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
