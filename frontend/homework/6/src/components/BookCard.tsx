import type { FC } from 'react';
import type { Book } from '@/types/book.types';
import { formateRating, truncateText } from '@/utils/formatters';

interface BookCardProps {
  book: Book;
}

// Book Card for each book
export const BookCard: FC<BookCardProps> = ({ book }) => {
  return (
    <div className={`book-card ${book.available ? 'book-card-available' : 'book-card-unavailable'}`}>
      {/* Book card Badge that shows that book is available or not */}
      <div className={`book-card_badge ${book.available ? 'book-card_badge-available' : 'book-card_badge-unavailable'}`}>
        {book.available ? 'Available' : 'Unavailable'}
      </div>

      {/* Book Title */}
      <h3 className="book-card_title" title={book.title}>
        {truncateText(book.title, 50)}
      </h3>

      {/* Book Author Name */}
      <p className="book-card_author">
        by {book.author}
      </p>

      {/* Book Genre */}
      <div className="book-card_genre">
        {book.genre}
      </div>

      {/* Book Description */}
      {book.description && (
        <p className="book-card_description" title={book.description}>
          {truncateText(book.description, 120)}
        </p>
      )}

      {/* Book Footer which has : Publish Year and Total Pages */}
      <div className="book-card_footer">
        <div className="book-card_meta">
          <span className="book-card_meta-item">
            <strong>Year:</strong> {book.year}
          </span>
          <span className="book-card_meta-item">
            <strong>Pages:</strong> {book.pages}
          </span>
        </div>

        {/* Book Rating */}
        <div className="book-card_rating">
          <div className="book-card_stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`book-card_star ${star <= Math.floor(book.rating) ? 'book-card_star-active' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="book-card_rating-value">
            {formateRating(book.rating)}
          </span>
        </div>
      </div>
    </div>
  );
};
