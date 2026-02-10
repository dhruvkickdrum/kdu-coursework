import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import type { Book, BookFilters } from './types/book.types';
import { LibraryStatsDisplay } from './components/LibraryStats';
import { booklibraryService } from './services/BookLibraryService';
import { FilterBar } from './components/FilterBar';
import { BookList } from './components/BookList';
import { Pagination } from './components/Pagination';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showStats, setShowStats] = useState<boolean>(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<BookFilters>({
    searchQuery: '',
    genre: 'All',
    minRating: 0,
    availableOnly: false,
  });

  const pageSize = 20;
  const totalCount = filteredBooks.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const paginatedBooks = useMemo(
    () => filteredBooks.slice(startIndex, endIndex),[filteredBooks, startIndex, endIndex]
  );

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [books, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if(currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const fetchedBooks = await booklibraryService.fetchBooksFromData();
      setBooks(fetchedBooks);
    } catch(error) {
        console.error("Error loading books : ", error);
    } finally{
      setLoading(false);
    }
  };

  const applyFilters = () => {
    const filtered = booklibraryService.filterBooks(filters);
    setFilteredBooks(filtered);
  };

  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }


  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const getStats = () => {
    return booklibraryService.getLibraryStatistics();
  }

  const getGenres = () => {
    return booklibraryService.getAllGenres();
  }
  
  const handleFilterChange = (newFilters: BookFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={`app theme-${theme}`}>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className='app_main'>
        <div className="app_controls">
          <button className="btn btn-primary" onClick={() => setShowStats(!showStats)}>
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>
        {showStats && <LibraryStatsDisplay stats={getStats()} />}
      
        <FilterBar filters={filters} onFilterChange={handleFilterChange} genres={getGenres()} />
      
        <BookList books={paginatedBooks} loading={loading} totalCount={totalCount} rangeStart={totalCount === 0 ? 0 : startIndex + 1} rangeEnd={endIndex} />
      
        {totalPages > 1 && (
          <div className='app_pagination'>
              <Pagination currentPage={safePage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        )}
      </main>

    
    


    </div>


  )
}

export default App
