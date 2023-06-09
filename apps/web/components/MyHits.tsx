import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Typography from "@mui/material/Typography";
import Hits from "./Hits";
import { IHit } from "../interfaces/hit.interface";
export default function MyHits({ hits }: { hits: IHit[] }) {
  return (
    <section>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>My Hits</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {hits.length > 0 ? (
            <Hits hits={hits} />
          ) : (
            <Typography>You dont have any hits</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </section>
  );
}
