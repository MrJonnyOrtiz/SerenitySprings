import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';

function Footer(currentUser, handleCurrentUser, cart, handleCart) {
   return (
      <footer>
         <Box
            sx={{
               backgroundColor: 'var(--color-brand--1)',
               color: 'var(--color-base--3)',
               marginTop: '2rem',
            }}
         >
            <Container maxWidth="lg">
               <Grid container spacing={3}>
                  {/* 3 COLUMNS */}

                  <Grid xs={12} sm={4}>
                     <Box>
                        <Typography variant="h5">
                           <strong>Serenity Springs</strong>{' '}
                        </Typography>
                     </Box>
                     <Box> Tampa, FL</Box>
                  </Grid>

                  {/* LINKS */}
                  <Grid xs={12} sm={4}>
                     <Box>
                        <Typography
                           variant="h6"
                           sx={{ textDecoration: 'underline' }}
                        >
                           <strong>Quick Links</strong>
                        </Typography>
                     </Box>
                     <Box>
                        <Link
                           href="/services"
                           underline="hover"
                           sx={{
                              paddingLeft: '1rem',
                              color: 'var(--color-base--3)',
                              textAlign: 'center',
                           }}
                        >
                           Services
                        </Link>
                     </Box>
                     <Box>
                        <Link
                           href="/faves"
                           underline="hover"
                           sx={{
                              paddingLeft: '1rem',
                              color: 'var(--color-base--3)',
                              textAlign: 'center',
                           }}
                        >
                           Faves
                        </Link>
                     </Box>
                     <Box>
                        <Link
                           href="/bookings"
                           underline="hover"
                           sx={{
                              paddingLeft: '1rem',
                              color: 'var(--color-base--3)',
                              textAlign: 'center',
                           }}
                        >
                           Bookings
                        </Link>
                     </Box>
                     <Box>
                        <Link
                           href="/cart"
                           underline="hover"
                           sx={{
                              paddingLeft: '1rem',
                              color: 'var(--color-base--3)',
                              textAlign: 'center',
                           }}
                        >
                           Cart
                        </Link>
                     </Box>
                     <Box>
                        <Link
                           href="/about"
                           underline="hover"
                           sx={{
                              paddingLeft: '1rem',
                              color: 'var(--color-base--3)',
                              textAlign: 'center',
                           }}
                        >
                           About
                        </Link>
                     </Box>
                  </Grid>

                  {/* SOCIAL */}
                  <Grid xs={12} sm={4}>
                     <Box>
                        <Typography
                           variant="h6"
                           sx={{ textDecoration: 'underline' }}
                        >
                           <strong>Follow Us!</strong>
                        </Typography>
                     </Box>
                     <Box>
                        <Link
                           href="#"
                           underline="hover"
                           sx={{
                              paddingLeft: '2rem',
                              color: 'var(--color-base--3)',
                              textAlign: 'center',
                           }}
                        >
                           <i className="fa-brands fa-facebook"></i>
                        </Link>
                     </Box>
                     <Box>
                        <Link
                           href="#"
                           underline="hover"
                           sx={{
                              paddingLeft: '2rem',
                              color: 'var(--color-base--3)',
                              textAlign: 'center',
                           }}
                        >
                           <i className="fa-brands fa-instagram"></i>
                        </Link>
                     </Box>
                     <Box>
                        <Link
                           href="#"
                           underline="hover"
                           sx={{
                              paddingLeft: '2rem',
                              color: 'var(--color-base--3)',
                              textAlign: 'center',
                           }}
                        >
                           <i className="fa-brands fa-youtube"></i>
                        </Link>
                     </Box>
                  </Grid>

                  {/* COPYRIGHT */}
                  <Grid xs={12}>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        Copyright © {new Date().getFullYear()} &nbsp;
                        <Link
                           href="https://cloudrealmllc.com"
                           target="_blank"
                           rel="noopener noreferrer"
                           underline="hover"
                           sx={{
                              color: 'var(--color-base--3)',
                           }}
                        >
                           Cloud Realm LLC
                        </Link>
                     </Box>
                  </Grid>
               </Grid>
            </Container>
         </Box>
      </footer>
   );
}

export default Footer;
