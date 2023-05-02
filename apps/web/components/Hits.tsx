import { List } from "@mui/material";
import Hit from "./Hit";
import { IHit } from "../interfaces/hit.interface";

export default function ({hits}: {hits: IHit[]}) {
  return (
    <List>
      {
        hits && hits.map(hit => (
          <Hit key={hit.id} id="asdasd" createdBy="asdad" description="asdsa" target="asdas" />
        ))
      }
    </List>
  );
}
