import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ListItem({ item, children }) {
   // cycle through the item's keys and create the card's image if present and content

   const cardTitleNames = [
      'time_interval',
      'service_type_name',
      'name',
      'first_name',
      'last_name',
   ];

   const itemEntries = Object.entries(item);

   const itemEl = itemEntries.map(([k, v]) => {
      if (k === 'id') return false;

      // is the key a card title name, or card content
      if (cardTitleNames.includes(k)) {
         // key is a title
         return (
            <Box key={k}>
               <Typography gutterBottom variant="h5" component="div">
                  {k === 'time_interval' ? `${v} minutes` : v}
               </Typography>
            </Box>
         );
      } else {
         // key is content
         return (
            <Box key={k}>
               <Typography variant="body2" color="text.secondary">
                  {k === 'price' ? `$ ${v}` : v}
               </Typography>
            </Box>
         );
      }
   });

   return (
      <Container maxWidth="sm">
         <Card key={item.id} id={item.id} variant="outlined">
            {item.image_url && (
               <CardMedia
                  component="img"
                  height="140"
                  image={item.image_url}
                  alt="green iguana"
               />
            )}
            <CardContent>{itemEl}</CardContent>
            <CardActions>{children}</CardActions>
         </Card>
      </Container>
   );
}

export default ListItem;
