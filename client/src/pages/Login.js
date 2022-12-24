import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Register from '../pages/Register';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import hero from '../assets/sam-carter-OL3fzrOhvPo-unsplash.jpg';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Copyright from '../components/Copyright';
import logo from '../assets/serenitySpringsLogoNoName.png';

const HtmlTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} classes={{ popper: className }} placement="bottom" />
))(({ theme }) => ({
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
   },
}));

function Login({ handleCurrentUser }) {
   const [toggle, setToggle] = useState(true);
   const [error, setError] = useState('');

   const history = useHistory();

   useDocumentTitle('Serenity Springs - Login');

   const initialData = {
      email: '',
      password: '',
   };

   const { formData, handleChange } = useForm(initialData);

   function handleClick() {
      setToggle((preToggle) => !preToggle);
   }

   // TODO: change to async/await
   const handleSubmit = (e) => {
      e.preventDefault();
      // login user
      fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ ...formData }),
      }).then((r) => {
         if (r.ok) {
            r.json().then((user) => {
               handleCurrentUser(user);
               history.push('/');
            });
         } else {
            r.json().then((json) => setError(json.error));
            history.push('/login');
         }
      });
   };

   return (
      <>
         {/* non-xs logo & name */}
         <Box m={2} display="flex" alignItems="center" justifyContent="center">
            <Box
               sx={{
                  display: { xs: 'none', md: 'flex' },
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
                     }}
                  >
                     <Typography variant="h2">
                        Welcome to Serenity Springs!
                     </Typography>
                  </Box>
               </Box>
            </Box>
         </Box>
         <Box
            m={2}
            sx={{
               display: { xs: 'none', md: 'flex' },
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Typography
               variant="h3"
               sx={{ color: 'gray', fontFamily: 'Cursive' }}
            >
               "Live beautifully"
            </Typography>
         </Box>
         <Box
            m={2}
            sx={{
               display: { xs: 'none', md: 'flex' },
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Typography variant="h5" sx={{ color: 'gray' }}>
               Serving the Tampa Bay Area.
            </Typography>
         </Box>

         {/* xs logo & name */}
         <Box
            mb={2}
            align="center"
            sx={{
               display: { xs: 'flex', md: 'none' },
               flexGrow: 1,
               textDecoration: 'none',
            }}
         >
            <Grid container>
               <Grid item xs={12}>
                  <Box m={1}>
                     <Typography variant="h2">
                        Welcome to Serenity Springs!
                     </Typography>
                  </Box>
               </Grid>
               <Grid item xs={12}>
                  <Box m={1}>
                     <Typography
                        variant="h4"
                        sx={{ color: 'gray', fontFamily: 'Cursive' }}
                     >
                        "Live beautifully"
                     </Typography>
                  </Box>
               </Grid>
               <Grid item xs={12}>
                  <Box m={1}>
                     <Typography variant="h6" sx={{ color: 'gray' }}>
                        Serving the Tampa Bay Area.
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </Box>

         {toggle ? (
            <>
               <Grid container component="main" sx={{ height: '50vh' }}>
                  <CssBaseline />
                  <HtmlTooltip
                     title={
                        <>
                           <em>
                              {'Photo by '}{' '}
                              <a href="https://unsplash.com/@samdc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                                 {'Sam Carter '}
                              </a>
                              {'on '}
                              <a href="https://unsplash.com/photos/OL3fzrOhvPo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                                 {'Unsplash'}
                              </a>
                           </em>
                        </>
                     }
                  >
                     <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                           backgroundImage: `url(${hero})`,
                           backgroundRepeat: 'no-repeat',
                           backgroundColor: (t) =>
                              t.palette.mode === 'light'
                                 ? t.palette.grey[50]
                                 : t.palette.grey[900],
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                        }}
                     />
                  </HtmlTooltip>
                  <Grid
                     item
                     xs={12}
                     sm={8}
                     md={5}
                     component={Paper}
                     elevation={6}
                     square
                  >
                     <Box
                        sx={{
                           my: 8,
                           mx: 4,
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                        }}
                     >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                           <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                           Sign in
                        </Typography>
                        <Box
                           component="form"
                           noValidate
                           onSubmit={handleSubmit}
                           sx={{ mt: 1 }}
                        >
                           <TextField
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              autoComplete="email"
                              autoFocus
                           />
                           <TextField
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Password"
                              type="password"
                              id="password"
                              value={formData.password}
                              onChange={handleChange}
                              autoComplete="current-password"
                           />
                           {/* <FormControlLabel
                              control={
                                 <Checkbox value="remember" color="primary" />
                              }
                              label="Remember me"
                           /> */}
                           {error && <Alert severity="error">{error}.</Alert>}
                           <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                           >
                              Sign In
                           </Button>
                           <Grid
                              container
                              direction="column"
                              alignItems="center"
                              justifyContent="center"
                           >
                              {/* <Grid item xs>
                                 <Link href="#" variant="body2">
                                    Forgot password?
                                 </Link>
                              </Grid> */}
                              <Grid item>
                                 <Button
                                    size="small"
                                    variant="text"
                                    onClick={handleClick}
                                 >
                                    {`Don't have an account? Sign up!`}
                                 </Button>
                              </Grid>
                           </Grid>
                           <Box
                              mt={2}
                              sx={{
                                 display: { xs: 'flex', md: 'none' },
                                 flexGrow: 1,
                              }}
                           >
                              <Box m="auto">
                                 <Link href="/">
                                    <img
                                       src={logo}
                                       alt="serenity springs salon and spa logo"
                                    />
                                 </Link>
                              </Box>
                           </Box>{' '}
                           <Copyright sx={{ mt: 5 }} />
                        </Box>
                     </Box>
                  </Grid>
               </Grid>
            </>
         ) : (
            <Register handleCurrentUser={handleCurrentUser} />
         )}
      </>
   );
}
export default Login;
