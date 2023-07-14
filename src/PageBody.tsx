import { namesData } from "./data/NamesData";
import { BabyNameEntry } from "./components/BabyNamesEntry";
import { useState } from "react";

function PageBody(): JSX.Element {
  const [searchInput, setSearchInput] = useState("");
  const [favoriteNames, setFavoriteNames] = useState<BabyNameEntry[]>([]);
  const [mainList, setMainList] = useState<BabyNameEntry[]>(namesData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleNameClick = (name: BabyNameEntry) => {
    if (favoriteNames.includes(name)) {
      setFavoriteNames((prevFavoriteNames) => prevFavoriteNames.filter((entry) => entry !== name));
    } else {
      setFavoriteNames((prevFavoriteNames) => [...prevFavoriteNames, name]);
    }
  };

  const handleFavoriteNameClick = (name: BabyNameEntry) => {
    setFavoriteNames((prevFavoriteNames) => prevFavoriteNames.filter((entry) => entry !== name));
  };

  const filteredEntries: BabyNameEntry[] = mainList.filter((entry) =>
    entry.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortedEntries: BabyNameEntry[] = filteredEntries
    .slice()
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

  const nameItems: JSX.Element[] = sortedEntries.map((entry) => (
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
      <input
        type="text"
        placeholder="Search here"
        onChange={handleChange}
        value={searchInput}
      />
      <hr />
      <h2>Favorites: {favoriteNameItems}</h2>
      <hr />
      <div className="all-names">{nameItems}</div>
    </div>
  );
}

export default PageBody;
