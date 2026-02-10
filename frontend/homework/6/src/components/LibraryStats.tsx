import type { FC } from "react";
import type { Genre, LibraryStats } from "@/types/book.types";
import { formateNumber } from "@/utils/formatters";

// Inteface for library props
interface LibraryStatsProps {
    stats: LibraryStats;
}

type StatVariant = 'info' | 'success' | 'danger' | 'warning' | 'purple' | 'accent';

export const LibraryStatsDisplay: FC<LibraryStatsProps> = ({ stats }) => {
    const genreEntries = Object.entries(stats.genreDistribution) as Array<[Genre, number]>;

    return (
        <div className="library-stats">
            <h2 className="library-stats_title">Library Statistics</h2>

            <div className="library-stats_grid">
                <StatCard
                    label="Total Books"
                    value={formateNumber(stats.totalBooks)}
                    variant="info"
                />
                <StatCard
                    label="Available"
                    value={formateNumber(stats.availableBooks)}
                    variant="success"
                />
                <StatCard
                    label="Unavailable"
                    value={formateNumber(stats.unavailableBooks)}
                    variant="danger"
                />
                <StatCard
                    label="Avg Rating"
                    value={`${stats.averageRating} ★`}
                    variant="warning"
                />
                <StatCard
                    label="Total Pages"
                    value={formateNumber(stats.totalPages)}
                    variant="purple"
                />
                <StatCard
                    label="Year Range"
                    value={`${stats.oldestBook} - ${stats.newestBook}`}
                    variant="accent"
                />
            </div>
            <div className="library-stats_section">
                <h3 className="library-stats_subtitle">Genre Distribution</h3>
                <div className="library-stats_genre-grid">
                    {/* Show the genre with their count in sorted order */}
                    {genreEntries.filter(([_, count]) => count > 0) // Filtre the genre on their count, count should be greater then 0
                    .sort((a, b) => b[1] - a[1]) // sorting 
                    .map(([genre, count]) => ( // traverse the genre array and print the name and the count.
                        <div key={genre} className="genre-pill">
                            <span className="genre-pill_label">{genre}</span>
                            <span className="genre-pill_count">{count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Prop for each stat card 
interface StatCardProps {
    label: string;
    value: string;
    variant: StatVariant;
}

// Stat card component
const StatCard: FC<StatCardProps> = ({ label, value, variant }) => {
  return (
    <div className={`stat-card stat-card-${variant}`}>
      <div className="stat-card_label">{label}</div>
      <div className="stat-card_value">{value}</div>
    </div>
  );
};
