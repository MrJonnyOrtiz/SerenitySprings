import logo from '../assets/serenitySpringsLogoNoName.png';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Header() {
   return (
      <header>
         <Box
            sx={{
               textAlign: 'center',
               backgroundColor: 'var(--color-brand--1)',
            }}
         >
            <Box
               sx={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
               }}
            >
               <Link className="nav-link" to="/">
                  <img src={logo} alt="serenity springs salon and spa logo" />
               </Link>
            </Box>
            <Box
               sx={{
                  display: 'inline-block',
                  verticalAlign: 'middle',
               }}
            >
               <Typography component="h1" variant="h2">
                  <strong>Serenity Springs</strong>
               </Typography>
            </Box>
         </Box>
      </header>
   );
}

export default Header;
