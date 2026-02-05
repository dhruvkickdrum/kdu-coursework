// Formate Rating to display only one decimal point
export const formateRating = (rating: number) : string => {
    return rating.toFixed(1);
}

// truncate text to specified length
export const truncateText = (text: string, maxLength: number) : string => {
    if(text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

// Formate a number to 1000 sperator
export const formateNumber = (num: number) : string => {
    return num.toLocaleString();
}