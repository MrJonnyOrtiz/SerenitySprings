import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
   backgroundColor: 'var(--color-brand--1)',
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.tertiary,
}));

function Footer(currentUser, handleCurrentUser, cart, handleCart) {
   return (
      <footer>
         <Container
            maxWidth="lg"
            sx={{
               backgroundColor: 'var(--color-brand--1)',
               color: 'var(--color-base--3)',
               marginTop: '2rem',
            }}
         >
            <Stack
               direction={{ xs: 'column', sm: 'row' }}
               spacing={{ xs: 1, sm: 2, md: 4 }}
               alignItems="stretch"
               justifyContent="space-evenly"
            >
               <Item>
                  <Box>
                     <Typography variant="h5">
                        <strong>Serenity Springs</strong>{' '}
                     </Typography>
                     <Typography variant="h6" sx={{ fontFamily: 'Cursive' }}>
                        "Live beautifully"
                     </Typography>
                  </Box>
                  <Box>Tampa, FL</Box>
               </Item>

               {/* LINKS */}
               <Item>
                  <Box>
                     <Typography variant="h6">
                        <strong>Quick Links</strong>
                     </Typography>
                  </Box>
                  <Box>
                     <Link href="/services" underline="hover" color="inherit">
                        Services
                     </Link>
                  </Box>
                  <Box>
                     <Link href="/faves" underline="hover" color="inherit">
                        Faves
                     </Link>
                  </Box>
                  <Box>
                     <Link href="/bookings" underline="hover" color="inherit">
                        Bookings
                     </Link>
                  </Box>
                  <Box>
                     <Link href="/cart" underline="hover" color="inherit">
                        Cart
                     </Link>
                  </Box>
                  <Box>
                     <Link href="/about" underline="hover" color="inherit">
                        About
                     </Link>
                  </Box>
               </Item>

               {/* SOCIAL */}
               <Item>
                  <Box>
                     <Typography variant="h6">
                        <strong>Follow Us!</strong>
                     </Typography>
                  </Box>
                  <Box>
                     <Link href="#" underline="hover" color="inherit">
                        <i className="fa-brands fa-facebook"></i>
                     </Link>
                  </Box>
                  <Box>
                     <Link href="#" underline="hover" color="inherit">
                        <i className="fa-brands fa-instagram"></i>
                     </Link>
                  </Box>
                  <Box>
                     <Link href="#" underline="hover" color="inherit">
                        <i className="fa-brands fa-youtube"></i>
                     </Link>
                  </Box>
               </Item>
            </Stack>
            {/* COPYRIGHT */}
            <Stack m={2} p={2}>
               <Item>
                  Copyright © {new Date().getFullYear()} &nbsp;
                  <Link
                     href="https://cloudrealmllc.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     underline="hover"
                     color="inherit"
                  >
                     Cloud Realm LLC
                  </Link>
               </Item>
            </Stack>
         </Container>
      </footer>
   );
}

export default Footer;
