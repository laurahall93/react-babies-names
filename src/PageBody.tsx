import React, { useState } from "react";
import { namesData } from "./data/NamesData";
import { BabyNameEntry } from "./components/BabyNamesEntry";

enum GenderFilter {
  All = "all",
  Boys = "boys",
  Girls = "girls",
}

function PageBody(): JSX.Element {
  const [searchInput, setSearchInput] = useState("");
  const [favoriteNames, setFavoriteNames] = useState<BabyNameEntry[]>([]);
  const [genderFilter, setGenderFilter] = useState<GenderFilter>(
    GenderFilter.All
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleNameClick = (name: BabyNameEntry) => {
    if (favoriteNames.includes(name)) {
      setFavoriteNames((prevFavoriteNames) =>
        prevFavoriteNames.filter((entry) => entry !== name)
      );
    } else {
      setFavoriteNames((prevFavoriteNames) => [...prevFavoriteNames, name]);
    }
  };

  const handleFavoriteNameClick = (name: BabyNameEntry) => {
    setFavoriteNames((prevFavoriteNames) =>
      prevFavoriteNames.filter((entry) => entry !== name)
    );
  };

  const handleGenderFilterChange = (filter: GenderFilter) => {
    setGenderFilter(filter);
  };

  const filteredEntries: BabyNameEntry[] = namesData.filter((entry) =>
    entry.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredAndSortedEntries: BabyNameEntry[] = filteredEntries
    .filter((entry) => {
      if (genderFilter === GenderFilter.All) {
        return true;
      } else {
        return entry.sex === (genderFilter === GenderFilter.Boys ? "m" : "f");
      }
    })
    .sort((a: BabyNameEntry, b: BabyNameEntry) => a.name.localeCompare(b.name));

  const favoriteNameItems: JSX.Element[] = favoriteNames.map((entry) => (
    <p
      key={entry.id}
      className={`${entry.sex === "f" ? "girls" : "boys"} favorite-names`}
      onClick={() => handleFavoriteNameClick(entry)}
    >
      {entry.name}
    </p>
  ));

  const nameItems: JSX.Element[] = filteredAndSortedEntries.map((entry) => (
    <p
      key={entry.id}
      onClick={() => handleNameClick(entry)}
      className={`${entry.sex === "f" ? "girls" : "boys"}`}
    >
      {entry.name}
    </p>
  ));

  return (
    <div>
      <div className="inline-buttons">
        <input
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}
        />
        <div>
          <button
            className={genderFilter === GenderFilter.All ? "active" : ""}
            onClick={() => handleGenderFilterChange(GenderFilter.All)}
          >
            👨‍👧‍👦
          </button>
          <button
            className={genderFilter === GenderFilter.Boys ? "active" : ""}
            onClick={() => handleGenderFilterChange(GenderFilter.Boys)}
          >
            👦
          </button>
          <button
            className={genderFilter === GenderFilter.Girls ? "active" : ""}
            onClick={() => handleGenderFilterChange(GenderFilter.Girls)}
          >
            👧
          </button>
        </div>
      </div>
      <h2>Favorites: {favoriteNameItems}</h2>
      <hr />
      <div className="all-names">{nameItems}</div>
    </div>
  );
}

export default PageBody;
