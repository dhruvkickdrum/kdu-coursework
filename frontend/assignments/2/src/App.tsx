import { useEffect, useState, type FC } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import './styles/_reset.scss';
import './styles/_globals.scss';
import { loadingConfiguration } from './features/config/configSlice';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import BookingPage from './pages/BookingPage/BookingPage';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error, configuration } = useAppSelector(state => state.config);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadingConfiguration());
  }, [dispatch]);

  const handleBookingSuccess = (id: string) => {
    setBookingId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loader size="large" message="Loading booking options..." />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div style={{
          padding: '48px 24px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{ color: '#E53935', marginBottom: '16px' }}>
            Error Loading Configuration
          </h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            {error}
          </p>
          <button
            onClick={() => dispatch(loadingConfiguration())}
            style={{
              padding: '12px 24px',
              backgroundColor: '#5BBEC8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </div>
      </>
    );
  }

  if (!configuration) {
    return null;
  }

  return (
    <>
      <Header />
      {bookingId ? (
        <ConfirmationPage bookingId={bookingId} />
      ) : (
        <BookingPage onBookingSuccess={handleBookingSuccess} />
      )}
    </>
  );
};

export default App;