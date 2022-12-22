import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ListItem({ item, children, currentUser, title }) {
   const itemEntries = Object.entries(item);

   const itemEl = itemEntries.map(([k, v]) => {
      // guard clause to not show an item's ids or image url
      if (
         k === 'id' ||
         k === 'image_url' ||
         k === 'service_type_id' ||
         k === 'duration_id' ||
         k === 'service_id' ||
         k === 'wishlist_id'
      )
         return false;

      // if title = service or fave or cart, style key name as a title, or
      // if title = duration or service type, style key name time interval and service type name as titles.
      // style remaining keys as a subtitles and show time interval iff title is not service type and service type name = Spa

      return (
         ((title === 'service' || title === 'favorite' || title === 'cart') &&
            k === 'name' && (
               <Box key={k}>
                  <Typography gutterBottom variant="h5" component="div">
                     {v}
                  </Typography>
               </Box>
            )) ||
         ((title === 'duration' || title === 'service type') &&
            (k === 'time_interval' || k === 'service_type_name') && (
               <Box key={k}>
                  <Typography gutterBottom variant="h5" component="div">
                     {k === 'time_interval' ? `${v} minutes` : v}
                  </Typography>
               </Box>
            )) || (
            <Box key={k}>
               <Typography variant="h6" color="text.secondary">
                  {(k === 'price' && `Price: $ ${v}`) ||
                     (k === 'service_type_name' && `Service type: ${v}`) ||
                     (k === 'description' && `Service details: ${v}`)}
               </Typography>
            </Box>
         )
      );
   });

   const foundFave =
      (currentUser.favorites.find((fave) => fave.service_id === item.id) &&
         true) ||
      false;

   const myChildren = React.Children.toArray(children);

   const myChildrenEl =
      (title === 'service' &&
         foundFave &&
         React.Children.map(myChildren, (child) => {
            return child.props.children.map((element) => {
               return (
                  (element.props.children === 'Fave Me!' &&
                     React.cloneElement(element, {
                        disabled: true,
                        children: 'FAVED',
                     })) ||
                  element
               );
            });
         })) ||
      children;

   return (
      <Container maxWidth="sm">
         <Card key={item.id} id={item.id} variant="outlined">
            {item.image_url && (
               <CardMedia
                  component="img"
                  image={item.image_url}
                  alt={item.description}
               />
            )}
            <CardContent>
               {itemEl}
               {title !== 'service type' &&
                  item.service_type_name === 'Spa' && (
                     <Typography variant="body2" color="text.secondary">
                        Duration: {item.time_interval} minutes
                     </Typography>
                  )}
            </CardContent>
            <CardActions>
               {myChildrenEl}
               {/* TODO: CHANGE THE BUTTON'S NAME IF ADDED TO CART */}
            </CardActions>
         </Card>
      </Container>
   );
}

export default ListItem;
