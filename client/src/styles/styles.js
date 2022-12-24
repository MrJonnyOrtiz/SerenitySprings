import { createTheme } from '@mui/material/styles';

const Colors = {
   primary: '#999b84',
   secondary: '#ddb7ab',
   success: '',
   info: '',
   danger: '',
   warning: '',
   light: '#caccb4',
   dark: '6b6d57',
   muted: '',
   border: '',
   inverse: '',
   shaft: '',
   body_bg: '',
   white: '#fff',
   black: '#000',
   gray: '#808080',
};

const theme = createTheme({
   palette: {
      primary: {
         main: Colors.primary,
      },
      secondary: {
         main: Colors.secondary,
      },
      text: {
         primary: Colors.primary,
         secondary: Colors.gray,
         tertiary: Colors.white,
      },
   },

   shape: {
      borderRadius: 4,
   },

   components: {
      MuiAppBar: {
         styleOverrides: {
            root: {
               color: Colors.white,
            },
         },
      },
   },
});

export default theme;
