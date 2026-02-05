import { GENRES } from '../types/book.types';
import { Genre, type Book, type BookFilters, type LibraryStats, type SearchResult } from '../types/book.types';
import { booksData } from '../data/book.data';


// service class that manages all the services
export class BookLibraryService {
    private books: Book[] = [];

    constructor() {
        this.initializeBooksLibrary();
    }

    // Initialize the library by laoding the books
    private initializeBooksLibrary(): void {
        this.books = [...booksData];
    }

    // Fetch all books from local storage
    public async fetchBooksFromData() : Promise<Book[]> {
        return new Promise((resolve) => {
            // simulate async operation
            setTimeout(() => {
                resolve([...this.books]);
            }, 100);
        })
    }


    // Search books by author or title
    public searchBooks(query: string) : SearchResult {
        if(!query || query.trim() === '') {
            console.log('Search query is empty. Retuning all books');
            return [...this.books];
        }

        const formattedQuery = query.toLowerCase().trim();

        // Filter books by title or author (case-insensitve)
        const result = this.books.filter((book) => {
            const titleMatch = book.title.toLowerCase().includes(formattedQuery);
            const authorMatch = book.title.toLowerCase().includes(formattedQuery);
            return titleMatch || authorMatch;
        });

        console.log(`Search results for "${query}" : `);
        console.log(`Found ${result.length} books`);
        result.forEach((book) => {
            console.log(`- ${book.title} by ${book.author}`);
        });
        return result;
    }

    // Get available books
    public getAvailableBooks() : Book[] {
        return this.books.filter((book) => book.available);
    }

    // Get books by year range
    public getBookByYearRange(startYear: number, endYear: number) : Book[] {
        if(startYear > endYear) {
            throw new Error('Start year cannot be greater than end year');
        }

        return this.books.filter((book) => book.year >= startYear && book.year <= endYear);
    }

    // Get books by genre
    public getBooksByGenre(genre: Genre) : Book[] {
        return this.books.filter((book) => book.genre === genre);
    }

    // Get Books by rating
    public getBooksByRating(minRating: number) : Book[] {
        if(minRating < 0 || minRating > 5) {
            throw new Error('Rating must be between 0 and 5');
        }
        return this.books.filter((book) => book.rating >= minRating);
    }

    // Get books by id
    public getBookById(id: number): Book | undefined {
        return this.books.find((book) => book.id === id);
    }

    // Filter function
    public filterBooks(filters: BookFilters) : Book[] {
        let filteredBooks = [...this.books];

        // Apply the search query filter
        if(filters.searchQuery && filters.searchQuery.trim() !== '') {
            const formattedQuery = filters.searchQuery.toLowerCase().trim();
            filteredBooks = filteredBooks.filter((book) => {
                const titleMatch = book.title.toLocaleLowerCase().includes(formattedQuery);
                const authorMatch = book.author.toLocaleLowerCase().includes(formattedQuery);
                return titleMatch || authorMatch;
            });
        }

        // Apply genre filter
        if (filters.genre && filters.genre !== 'All') {
            filteredBooks = filteredBooks.filter((book) => book.genre === filters.genre);
        }

        // Apply minimum rating filter
        const minRating = filters.minRating;
        if (minRating !== undefined && minRating > 0) {
            filteredBooks = filteredBooks.filter((book) => book.rating >= minRating);
        }

        // Apply availability filter
        if (filters.availableOnly) {
            filteredBooks = filteredBooks.filter((book) => book.available);
        }

        // Apply year range filter
        const { startYear, endYear } = filters;
        if (startYear !== undefined && endYear !== undefined) {
            filteredBooks = filteredBooks.filter(
                (book) => book.year >= startYear && book.year <= endYear
            );
        }

        return filteredBooks;
    }


    // FUnction for library statistics
    public getLibraryStatistics(): LibraryStats {
        const totalBooks = this.books.length;
        const availableBooks = this.getAvailableBooks().length;
        const unavailableBooks = totalBooks - availableBooks;

        const totalRating = this.books.reduce((sum, book) => sum + book.rating, 0);
        const averageRating = totalBooks > 0 ? totalRating / totalBooks : 0;

        const totalPages = this.books.reduce((sum, book) => sum + book.pages , 0);

        // Genre distribution
        const genreDistribution: Record<Genre, number> = {} as Record<Genre, number>;
        GENRES.forEach((genre) => {
            genreDistribution[genre] = this.books.filter((book) => book.genre === genre).length;
        });

        const years = this.books.map((book) => book.year);
        const oldestBook = Math.min(...years);
        const newestBook = Math.max(...years);
        return {totalBooks, availableBooks, unavailableBooks, averageRating: Math.round(averageRating * 10)/ 10, totalPages, genreDistribution, oldestBook, newestBook};
    }

    // Get all genres
    public getAllGenres(): Genre[] {
        return [...GENRES];
    }
}

export const booklibraryService = new BookLibraryService();