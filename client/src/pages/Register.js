import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Register({ handleCurrentUser }) {
   const [error, setError] = useState('');

   const history = useHistory();

   useDocumentTitle('Serenity Springs - Register');

   const initialData = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
   };

   const { formData, handleChange } = useForm(initialData);

   // TODO: use async/await
   const handleSubmit = (e) => {
      e.preventDefault();

      const configObjNewUser = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ ...formData }),
      };

      fetch(`/users`, configObjNewUser).then((res) => {
         if (res.ok) {
            res.json().then((user) => {
               console.log('new user created');

               // create an account
               const configObjAccount = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     user_id: user.id,
                  }),
               };
               fetch('/accounts', configObjAccount).then((res) => {
                  if (res.ok) {
                     res.json().then((newAccount) => {
                        console.log('new account created');
                     });
                  } else {
                     res.json().then(
                        (data) => console.log(data.errors)
                        // TODO: HANDLE ERROR
                        //   setError(data.errors.service_type_name[0])
                        // data.errors.duration[0]
                        // data.errors.service_type[0]
                     );
                  }
               });
               // create a wishlist
               const configObjWishlist = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     user_id: user.id,
                  }),
               };
               fetch('/wishlists', configObjWishlist).then((res) => {
                  if (res.ok) {
                     res.json().then((newWishlist) => {
                        console.log('new wishlist created');
                     });
                  } else {
                     res.json().then(
                        (data) => console.log(data.errors)
                        // TODO: HANDLE ERROR
                        //   setError(data.errors.service_type_name[0])
                        // data.errors.duration[0]
                        // data.errors.service_type[0]
                     );
                  }
               });
               handleCurrentUser(user);
               history.push('/logout');
               history.push('/login');
               alert(`Welcome, ${user.first_name}!  Please login below.`);
            });
         } else {
            res.json().then((data) => setError(data.errors));
         }
      });
   };

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Sign up
               </Typography>
               <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                        <TextField
                           autoComplete="given-name"
                           name="first_name"
                           value={formData.first_name}
                           required
                           fullWidth
                           id="first_name"
                           label="First Name"
                           autoFocus
                           onChange={handleChange}
                        />
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        <TextField
                           required
                           fullWidth
                           id="last_name"
                           label="Last Name"
                           name="last_name"
                           value={formData.last_name}
                           autoComplete="family-name"
                           onChange={handleChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           value={formData.email}
                           autoComplete="email"
                           onChange={handleChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name="password"
                           value={formData.password}
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="new-password"
                           onChange={handleChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name="password_confirmation"
                           value={formData.password_confirmation}
                           label="Password Confirmation"
                           type="password"
                           id="password_confirmation"
                           autoComplete="new-password"
                           onChange={handleChange}
                        />
                     </Grid>
                     {/* <Grid item xs={12}>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 value="allowExtraEmails"
                                 color="primary"
                              />
                           }
                           label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                     </Grid> */}
                  </Grid>
                  {error && <Alert severity="error">{error}.</Alert>}

                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                     <Grid item>
                        <Link href="/login" variant="body2">
                           Already have an account? Sign in
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
         </Container>
      </ThemeProvider>
   );
}

export default Register;
