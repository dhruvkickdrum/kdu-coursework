// type of books
export const Genre = {
  FICTION: 'Fiction',
  NON_FICTION: 'Non-Fiction',
  MYSTERY: 'Mystery',
  THRILLER: 'Thriller',
  SCIENCE_FICTION: 'Science Fiction',
  FANTASY: 'Fantasy',
  ROMANCE: 'Romance',
  BIOGRAPHY: 'Biography',
  HISTORY: 'History',
  SELF_HELP: 'Self-Help',
  BUSINESS: 'Business',
  TECHNOLOGY: 'Technology',
} as const;

export type Genre = (typeof Genre)[keyof typeof Genre];

export const GENRES = Object.values(Genre) as Genre[];

// Data structure of each book
export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  year: number;
  pages: number;
  rating: number;
  available: boolean;
  description?: string;
}

// FIlter by which we filters the book
export interface BookFilters {
  searchQuery?: string;
  genre?: Genre | 'All';
  minRating?: number;
  availableOnly?: boolean;
  startYear?: number;
  endYear?: number;
}

// stats of the book library
export interface LibraryStats {
  totalBooks: number;
  availableBooks: number;
  unavailableBooks: number;
  averageRating: number;
  totalPages: number;
  genreDistribution: Record<Genre, number>;
  oldestBook: number;
  newestBook: number;
}

// result type
export type SearchResult = Book[];
