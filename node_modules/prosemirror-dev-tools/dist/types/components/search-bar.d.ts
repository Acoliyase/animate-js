import React from "react";
interface SearchBarProps {
    onSearch: (query: string) => void;
}
declare const SearchBar: React.FC<SearchBarProps>;
export default SearchBar;
