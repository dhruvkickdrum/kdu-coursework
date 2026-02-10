import type { ChangeEvent, FC } from "react";
import type { BookFilters, Genre } from "@/types/book.types";

// Interface for filter bar props
interface FilterBarProps {
    filters: BookFilters;
    onFilterChange: (filters: BookFilters) => void;
    genres: Genre[]
}

export const FilterBar: FC<FilterBarProps> = ({
    filters, onFilterChange,genres
}) => {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFilterChange({...filters, searchQuery: e.target.value});
    };

    const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({
            ...filters,
            genre: e.target.value === 'All' ? 'All' : (e.target.value as Genre),
        });
    };

    const handleRatingChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onFilterChange({
            ...filters,
            minRating: e.target.value === 'all' ? 0 : Number.parseFloat(e.target.value),
        });
    };

    const handleAvailabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFilterChange({ ...filters, availableOnly: e.target.checked });
    };

    const handleReset = () => {
        onFilterChange({
            searchQuery: '',
            genre: 'All',
            minRating: 0,
            availableOnly: false,
        });
    };

    return (
        <div className="filter-bar">
            <h2 className="filter-bar_title">Search & Filter</h2>
            <div className="filter-bar_grid">
                <div className="filter-bar_field">
                    <label htmlFor="search" className="filter-bar_label">
                        Search by Title or Author
                    </label>
                    <input type="text" id="search" value={filters.searchQuery || ''} onChange={handleSearchChange} placeholder="Enter title or author" className="filter-bar_input" />
                </div>
                <div className="filter-bar_field">
                    <label htmlFor="genre" className="filter-bar_label">Genre</label>
                    <select id="genre" value={filters.genre || 'All'} onChange={handleGenreChange} className="filter-bar_select">
                        <option value="All">All Genres</option>
                        {genres.map((genre) => (
                            <option value={genre} key={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-bar_field">
                    <label className="filter-bar_label" htmlFor="rating">Minimum Rating</label>
                    <select id="rating" value={filters.minRating === 0 ? 'all' : filters.minRating?.toString()} onChange={handleRatingChange} className="filter-bar_select">
                        <option value="all">All Ratings</option>
                        <option value="4.5">4.5+ </option>
                        <option value="4.0">4.0+ </option>
                        <option value="3.5">3.5+ </option>
                        <option value="3.0">3.0+ </option>
                    </select>
                </div>

                <div className="filter-bar_field filter-bar_field-toggle">
                    <label className="filter-bar_toggle">
                        <input type="checkbox" checked={filters.availableOnly || false} onChange={handleAvailabilityChange} className="filter-bar_checkbox"/>
                        <span>Available Only</span>
                    </label>
                </div>
            </div>

            <div className="filter-bar_actions">
                <button className="btn btn-ghost" onClick={handleReset}>Reset Filters</button>
            </div>
        </div>
    );
};