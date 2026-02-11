import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, type ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearSearch, fetchAllProducts, searchProducts, setSearchQuery } from '../redux/productSlice';

// Navbar Component
export default function Navbar() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.products);
  const cartCount = useAppSelector((state) => state.cart.totalItems);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  }, [dispatch]);

  const handleClear = useCallback(() => {
    dispatch(clearSearch())
  }, [dispatch])

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if(!trimmedQuery) {
      dispatch(fetchAllProducts());
      return;
    }
    const timeout = globalThis.setTimeout(() => {
      dispatch(searchProducts(trimmedQuery));
    }, 500);
    return () => globalThis.clearTimeout(timeout);
  }, [dispatch, searchQuery]);

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
            <NavLink to="/cart" className={({ isActive }) => `navbar_link ${isActive ? 'is-active' : ''}`}>
              <span className='navbar_cart'>
                Cart
                <span className='navbar_badge' aria-label={`Cart items ${cartCount}`}>
                  {cartCount}
                </span>
              </span>
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
