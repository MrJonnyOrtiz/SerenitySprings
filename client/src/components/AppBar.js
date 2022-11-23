import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/serenitySpringsLogoNoName.png';
import Link from '@mui/material/Link';

const userPages = ['Services', 'Faves', 'Bookings', 'Cart', 'About'];
const adminPages = ['Services', 'Durations', 'Service types'];
const settings = ['Logout'];

const ResponsiveAppBar = ({
   currentUser,
   handleCurrentUser,
   cart,
   handleCart,
}) => {
   const [anchorElNav, setAnchorElNav] = useState(null);
   const [anchorElUser, setAnchorElUser] = useState(null);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };
   const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
   };

   const handleCloseNavMenu = () => {
      setAnchorElNav(null);
   };

   const handleCloseUserMenu = () => {
      setAnchorElUser(null);
   };

   const logout = () => {
      fetch('/logout', {
         method: 'DELETE',
      }).then(() => {
         handleCurrentUser(null);
         handleCart([]);
      });
   };

   return (
      <AppBar position="static">
         <Container
            maxWidth="xl"
            sx={{
               backgroundColor: 'var(--color-brand--1)',
            }}
         >
            <Toolbar disableGutters>
               {/* regular logo and name */}
               <Box
                  sx={{
                     display: { xs: 'none', md: 'flex' },
                     color: 'inherit',
                     textDecoration: 'none',
                  }}
               >
                  <Box>
                     <Box
                        sx={{
                           display: 'inline-block',
                           verticalAlign: 'middle',
                        }}
                     >
                        <Link href="/">
                           <img
                              src={logo}
                              alt="serenity springs salon and spa logo"
                           />
                        </Link>
                     </Box>
                     <Box
                        sx={{
                           display: 'inline-block',
                           verticalAlign: 'middle',
                           mr: 3,
                        }}
                     >
                        <Typography component="h1" variant="h4">
                           <strong>Serenity Springs</strong>
                        </Typography>
                     </Box>
                  </Box>
               </Box>

               {/* xs nav */}
               <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size="large"
                     aria-label="account of current user"
                     aria-controls="menu-appbar"
                     aria-haspopup="true"
                     onClick={handleOpenNavMenu}
                     color="inherit"
                  >
                     <MenuIcon />
                  </IconButton>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorElNav}
                     anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                     }}
                     open={Boolean(anchorElNav)}
                     onClose={handleCloseNavMenu}
                     sx={{
                        display: { xs: 'block', md: 'none' },
                     }}
                  >
                     {currentUser.is_admin
                        ? adminPages.map((page) => (
                             <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Button
                                   href={`/${page}`}
                                   color="inherit"
                                   underline="hover"
                                   sx={{
                                      textDecoration: 'none',
                                   }}
                                >
                                   {page}
                                </Button>
                             </MenuItem>
                          ))
                        : userPages.map((page) => (
                             <MenuItem key={page} onClick={handleCloseNavMenu}>
                                <Button
                                   href={`/${page}`}
                                   color="inherit"
                                   underline="hover"
                                   sx={{
                                      textDecoration: 'none',
                                      underline: 'hover',
                                   }}
                                >
                                   {page}
                                </Button>
                             </MenuItem>
                          ))}
                  </Menu>

                  {/* xs logo and name  */}
                  <Box
                     sx={{
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        color: 'inherit',
                        textDecoration: 'none',
                     }}
                  >
                     <Box
                        sx={{
                           display: { xs: 'flex' },
                           mt: 2,
                           textAlign: 'center',
                           alignItems: 'center',
                           backgroundColor: 'var(--color-brand--1)',
                        }}
                     >
                        <Box
                           sx={{
                              display: 'inline-block',
                              verticalAlign: 'middle',
                           }}
                        >
                           <Link href="/">
                              <img
                                 src={logo}
                                 alt="serenity springs salon and spa logo"
                              />
                           </Link>
                        </Box>
                        <Box
                           sx={{
                              display: 'inline-block',
                              verticalAlign: 'middle',
                           }}
                        >
                           <Typography component="h1" variant="h4">
                              <strong>Serenity Springs</strong>
                           </Typography>
                        </Box>
                     </Box>
                  </Box>
               </Box>

               {/* regular nav */}
               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {currentUser.is_admin
                     ? adminPages.map((page) => (
                          <Link
                             key={page}
                             href={`/${page}`}
                             underline="hover"
                             sx={{
                                mr: 3,
                                color: 'white',
                                display: 'block',
                                textDecoration: 'none',
                             }}
                          >
                             {page}
                          </Link>
                       ))
                     : userPages.map((page) => (
                          <Link
                             key={page}
                             href={`/${page}`}
                             underline="hover"
                             sx={{
                                mr: 3,
                                color: 'white',
                                display: 'block',
                                textDecoration: 'none',
                             }}
                          >
                             {page}
                          </Link>
                       ))}
               </Box>

               {/* profile button on nav */}
               <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                     <IconButton onClick={handleOpenUserMenu} sx={{ m: 1 }}>
                        <Avatar
                           alt={currentUser.first_name.charAt(0)}
                           src="/static/images/avatar/2.jpg"
                        />
                     </IconButton>
                  </Tooltip>
                  <Menu
                     sx={{ mt: '45px' }}
                     id="menu-appbar"
                     anchorEl={anchorElUser}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorElUser)}
                     onClose={handleCloseUserMenu}
                  >
                     {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                           <Button
                              href={`/${setting}`}
                              id="btn-logout"
                              data-hover={setting}
                              // TO-DO: make onClick dynamic
                              onClick={logout}
                              color="inherit"
                              sx={{ textDecoration: 'none' }}
                           >
                              {setting}
                           </Button>
                        </MenuItem>
                     ))}
                  </Menu>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default ResponsiveAppBar;
