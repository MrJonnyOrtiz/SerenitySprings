import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Welcome({ currentUser }) {
   useDocumentTitle('Serenity Springs - Welcome');

   const { first_name } = currentUser;

   return (
      <Grid
         container
         p={3}
         sx={{
            borderColor: 'var(--color-brand--4)',
            borderWidth: '0.5rem',
            borderStyle: 'solid',
         }}
      >
         <Grid item xs={12} m={2}>
            <Typography variant="h2">Welcome, {first_name}!</Typography>
         </Grid>

         <Grid item m={2} xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
               Check out our individually customized{' '}
               <Link href="/services">salon and spa experiences</Link>.
            </Typography>
         </Grid>
         <Grid item xs={12} m={2} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">
               We use all natural, handmade products.
            </Typography>
         </Grid>
      </Grid>
   );
}

export default Welcome;
