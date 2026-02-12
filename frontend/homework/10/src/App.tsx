import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import UserDirectory from './pages/UserDirectory';
import UserDetails from './pages/UserDetails';

function App() {

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className={styles.app}>
          <Routes>
            <Route path='/' element={<UserDirectory />} />
            <Route path='/users/:id' element={<UserDetails /> } />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
