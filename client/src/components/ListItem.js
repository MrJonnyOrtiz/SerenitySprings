import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function ListItem({ item, children }) {
   return (
      <Container maxWidth="sm">
         <Card key={item.id} id={item.id} variant="outlined">
            {item.image && (
               <CardMedia
                  component="img"
                  height="140"
                  image={item.image_url}
                  alt="green iguana"
               />
            )}
            <CardContent>
               {(item.time_interval >= 0 ||
                  item.service_type_name ||
                  item.name) && (
                  <Typography gutterBottom variant="h5" component="div">
                     {item.service_type_name ||
                        item.name ||
                        (item.time_interval >= 0 &&
                           item.time_interval + ' minutes')}
                  </Typography>
               )}
               {item.description && (
                  <Typography variant="body2" color="text.secondary">
                     {item.description}
                  </Typography>
               )}
               {item.price && (
                  <Typography variant="body2" color="text.secondary">
                     {item.price}
                  </Typography>
               )}
            </CardContent>
            <CardActions>{children}</CardActions>
         </Card>
      </Container>
   );
}

export default ListItem;
