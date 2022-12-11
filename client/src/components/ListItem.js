import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ListItem({ item, children, currentUser }) {
   // cycle through the item's keys and create the card's image if present and content

   const adminCardTitleNames = [
      'name',
      'first_name',
      'last_name',
      'time_interval',
      'service_type_name',
   ];
   const userCardTitleNames = ['name'];

   const itemEntries = Object.entries(item);

   const itemEl = itemEntries.map(([k, v]) => {
      if (
         k === 'id' ||
         k === 'image_url' ||
         k === 'service_type_id' ||
         k === 'duration_id'
      )
         return false;

      if (currentUser.is_admin) {
         if (adminCardTitleNames.includes(k)) {
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
                     {(k === 'price' && `$ ${v}`) ||
                        (k === 'service_type_name' && `${v} service`) ||
                        (k === 'description' && `Service details: ${v}`)}
                  </Typography>
               </Box>
            );
         }
      } else {
         // is the key a card title name, or card content
         if (userCardTitleNames.includes(k)) {
            // key is a title
            return (
               <Box key={k}>
                  <Typography gutterBottom variant="h5" component="div">
                     {v}
                  </Typography>
               </Box>
            );
         } else {
            // key is content
            return (
               <Box key={k}>
                  <Typography variant="body2" color="text.secondary">
                     {(k === 'price' && `$ ${v}`) ||
                        (k === 'service_type_name' && `${v} service`) ||
                        (k === 'description' && `Service details: ${v}`)}
                  </Typography>
               </Box>
            );
         }
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
                  alt={item.description}
               />
            )}
            <CardContent>
               {itemEl}
               {!currentUser.is_admin && item.service_type_name === 'Spa' && (
                  <Typography variant="body2" color="text.secondary">
                     {item.time_interval} minutes
                  </Typography>
               )}
            </CardContent>
            <CardActions>
               {children}
               {/* TODO: CHANGE THE BUTTON'S NAME IF FAVED */}
               {/* {children.forEach((child) => {
                  if (child) {
                     child.props.children.forEach((child2) =>
                        console.log(child2.props.children)
                     );
                  }
               })} */}
            </CardActions>
         </Card>
      </Container>
   );
}

export default ListItem;
