import { namesData } from '../data/NamesData';

interface BabyNamesProps {
    entries:typeof namesData;
}

export interface BabyNameEntry {
    id: number;
    name: string;
    sex : string;
}

const BabyNames = (props: BabyNamesProps): JSX.Element => {
    const {entries} = props;
    return (
        <div>
            {entries.map((entry, id) =>(
            <section key={entry.id}>
                <p>{entry.name}</p>
            </section>

            ))}
        </div>
    );
}

export default BabyNames;