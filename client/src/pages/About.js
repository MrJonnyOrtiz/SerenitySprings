import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function About() {
   useDocumentTitle('Serenity Springs - About');

   return (
      <Grid container spacing={2}>
         <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom mt={2}>
               About Us
            </Typography>
         </Grid>
         <Grid item xs={12}>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
               }}
            >
               <Box
                  component="img"
                  sx={{
                     border: '0.5rem',
                     borderStyle: 'outset',
                     borderColor: 'var(--color-brand--4)',
                     height: 400,
                     width: 'auto',
                     maxHeight: { xs: 250, md: 300, lg: 400 },
                  }}
                  alt="picture of the owners: Ariana and Briana"
                  src="https://serenity-springs-assets.s3.amazonaws.com/AboutUs.jpeg"
               />
            </Box>
         </Grid>
         <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: 'center' }}>
               Owners: Ariana on the left, Briana on the right
            </Typography>
         </Grid>
         <Grid item xs={12}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
               Serenity springs is run by sisters Arianna and Brianna Ortiz.
               They both graduated from Erwin Technical College; Arianna with a
               license in Cosmetology and Brianna in Massage Therapy.
            </Typography>
         </Grid>
         <Grid item xs={12}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
               We started this journey because we’ve always loved helping
               people. Our desire is to help people feel their best from the
               inside out while offering the cleanest products and services!
            </Typography>
         </Grid>
      </Grid>
   );
}

export default About;
