import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

export default function App() {
  return (
      <ErrorBoundary>
        <BrowserRouter>
          <div className="app-shell">
            <Navbar />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ErrorBoundary>
  )
}
