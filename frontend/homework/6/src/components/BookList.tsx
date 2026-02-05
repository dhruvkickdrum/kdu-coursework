import type { FC } from "react";

import type { Book } from "@/types/book.types";
import { BookCard } from "./BookCard";

// Inteface for book list props
interface BookListProps {
    books: Book[];
    loading?: boolean;
    totalCount: number;
    rangeStart: number;
    rangeEnd: number;
}

export const BookList: FC<BookListProps> = ({
    books, loading=false, totalCount, rangeStart, rangeEnd
}) => {
    // If loading is true then this will render
    if(loading) {
        return (
            <div className="book-list_loading">Loading Books....</div>
        );
    }

    // If their are no books then this will render
    if(books.length === 0) {
        return (
            <div className="book-list_empty">
                <h3 className="book-list_empty-title">No Books Found</h3>
                <p className="book-list_empty-text">Try adjusting search or filter criteria</p>
            </div>
        );
    }

    // otherwise this will render and show the list of books
    return (
        <div className="book-list">
            {/* Showing the range og the books, that how many books are their and how many are their in this page */}
            <div className="book-list_meta">
                Showing {rangeStart}-{rangeEnd} of {totalCount} {totalCount === 1 ? 'book' : 'books'}
            </div>
            {/* taverse the books array and render each books using the BookCard component */}
            <div className="book-list_grid">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    )
}