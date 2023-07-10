import  {namesData}  from "./data/NamesData";
import BabyNames, { BabyNameEntry } from "./components/BabyNamesEntry";





function PageBody(): JSX.Element {
    const sortedEntries: BabyNameEntry[] = namesData
      .slice()
      .sort((a: BabyNameEntry, b: BabyNameEntry) => a.name.localeCompare(b.name));

      const nameItems: JSX.Element[] = sortedEntries.map((entry) => (
        
        <p key={entry.id} className={entry.sex === "f" ? "girls" : "boys"}>
          {entry.name}
        </p>
      ));
    
      return <div>{nameItems}</div>;
    }

    export default PageBody;