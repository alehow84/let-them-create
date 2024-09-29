"use client";
import React, { createContext, useState, useContext } from "react";

interface SearchContextType {
  searchInput: string;
  setSearchInput: (input: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }: { children: any }) => {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput }}>
      {children}
    </SearchContext.Provider>
  );
};

// _app.tsx

/*
// In your SearchBar component
import { useSearch } from '../path/to/SearchContext';

const SearchBar: React.FC = () => {
  const { searchInput, setSearchInput } = useSearch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchInput}
      onChange={handleInputChange}
      placeholder="Search..."
    />
  );
};

*/
