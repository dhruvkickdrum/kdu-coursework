import { NavLink } from 'react-router-dom'

// Navbar Component
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar_inner">
        <div className="navbar_brand">
          <span className='navbar_heading'>Product Discovery</span>
        </div>
        <nav className="navbar_links">
          <NavLink to="/" end className={({ isActive }) => `navbar_link ${isActive ? 'is-active' : ''}`}>
            Home
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
