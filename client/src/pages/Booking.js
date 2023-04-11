import { useDocumentTitle } from "../hooks/useDocumentTitle";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { InlineWidget } from "react-calendly";

export default function Booking() {
   useDocumentTitle("Serenity Springs - Booking");

   return (
      <Container fixed>
         <Box>
            <Typography variant="h5" component="h2" gutterBottom mt={2}>
               Booking
            </Typography>
         </Box>
         <Box>
            <Typography variant="h6" component="h3" color="text.secondary">
               For a free consultation, or to book an appointment, follow these
               steps:
            </Typography>
         </Box>
         <Box mt={2} ml={2} pl={2}>
            <ol>
               <li>
                  <Typography color="text.secondary">
                     click "Make an appointment" below{" "}
                  </Typography>
               </li>{" "}
               <li>
                  <Typography color="text.secondary">
                     select an available date and time, then click Confirm
                  </Typography>
               </li>
               <li>
                  <Typography color="text.secondary">
                     enter your name, email address, and any additional
                     information you'd like to share with us for us to consider
                     before our meeting
                  </Typography>
               </li>
            </ol>
         </Box>
         <Box mt={2}>
            <Typography color="text.secondary">
               We will email you to confirm the date and time you chose for a
               free consultation, or to book an appointment.
            </Typography>
         </Box>
         <Box mt={2}>
            <Typography color="text.secondary">
               Thank you and we look forward to meeting you!
            </Typography>
         </Box>
         <Box>
            <InlineWidget url="https://calendly.com/yourserenitysprings" />
         </Box>
      </Container>
   );
}
