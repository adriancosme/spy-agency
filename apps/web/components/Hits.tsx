import { List } from "@mui/material";
import Hit from "./Hit";
import { IHit } from "../interfaces/hit.interface";

export default function Hits({ hits }: { hits: IHit[] }) {
  return (
    <List>
      {hits &&
        hits.map((hit) => (
          <Hit
            key={hit.id}
            id={hit.id}
            createdBy={hit.createdBy.name}
            description={hit.description}
            target={hit.target}
          />
        ))}
    </List>
  );
}
