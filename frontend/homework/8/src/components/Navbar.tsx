import { NavLink } from 'react-router-dom';
import { useCallback, type ChangeEvent } from 'react';
import { useProductContext } from '../context/ProductContext';

// Navbar Component
export default function Navbar() {
  const { searchQuery, setSearchQuery, clearSearch, searchLoading } = useProductContext();

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }, [setSearchQuery]);

  const handleClear = useCallback(() => {
    clearSearch()
  }, [clearSearch])

  return (
    <header className="navbar">
      <div className="navbar_inner">
        <div className="navbar_brand">
          <span className='navbar_heading'>Product Discovery</span>
        </div>
        <div className="navbar_search" role="search">
          <nav className="navbar_links">
            <NavLink to="/" end className={({ isActive }) => `navbar_link ${isActive ? 'is-active' : ''}`}>
              Home
            </NavLink>
          </nav>
          <div className="navbar_search-field">
            <input type="search" className='navbar_input' placeholder='Search Products...' value={searchQuery} onChange={handleSearchChange} aria-label='Search products' />
          </div>
        </div>
      </div>
    </header>
  )
}
