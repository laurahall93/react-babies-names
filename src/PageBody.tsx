import  {namesData}  from "./data/NamesData";
import  { BabyNameEntry } from "./components/BabyNamesEntry";
import { text } from "stream/consumers";
import {useState} from "react";







function PageBody(): JSX.Element {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const filteredEntries: BabyNameEntry[] = namesData.filter((names) =>
    names.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  

    const sortedEntries: BabyNameEntry[] = filteredEntries
      .slice()
      .sort((a: BabyNameEntry, b: BabyNameEntry) => a.name.localeCompare(b.name));

      const nameItems: JSX.Element[] = sortedEntries.map((entry) => (
        
        <p key={entry.id} className={entry.sex === "f" ? "girls" : "boys"}>
          {entry.name}
        </p>
      ));
    
      return <div>
              <input
                    type="text"
                    placeholder="Search here"
                    onChange={handleChange}
                    value={searchInput} 
                    />
                <hr />
                <div className="all-names">{nameItems}</div>
                <hr />
             </div> 
    }

    export default PageBody;