import type { FC } from "react";
interface HeaderProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

// Header Component
export const Header: FC<HeaderProps> = ({ theme, onToggleTheme}) => {
    return (
        <header className="header">
            <div className="header_inner">
                <div className="header_content">
                    <div>
                        <h1 className="header_title">Book Library Manager</h1>
                        <p className="header_subtitle">Search, filter, and explore your book collection</p>
                    </div>
                    <button className="btn btn-ghost" onClick={onToggleTheme} type="button">
                        {theme == 'light' ? 'Dark Mode': 'Light Mode'}
                    </button>
                </div>
            </div>
        </header>
    );
};