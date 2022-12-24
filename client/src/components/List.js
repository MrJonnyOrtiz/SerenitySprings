import { useDocumentTitle } from '../hooks/useDocumentTitle';
import ListItem from './ListItem';
import FormDialog from './FormDialog';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function List({
   arrName,
   arr,
   addArr,
   setArr,
   initialData,
   children,
   title,
   endpoint,
   currentUser,
   cart,
   open,
   serviceType,
   setServiceType,
   duration,
   setDuration,
   serviceTypeOptions,
   durationOptions,
   functionTitle,
   handleClickOpen,
   handleClose,
}) {
   useDocumentTitle(`Serenity Springs - ${arrName}`);

   const listEl = arr.map((arrItem) => (
      <Grid xs={12} sm={6} md={4} key={arrItem.id}>
         <Container maxWidth="sm">
            <ListItem
               key={arrItem.id}
               item={arrItem}
               currentUser={currentUser}
               title={title}
               cart={cart}
               open={open}
               handleClose={handleClose}
            >
               {children}
            </ListItem>
         </Container>
      </Grid>
   ));

   return (
      <Container fixed>
         <Typography variant="h5" component="h2" gutterBottom mt={2}>
            {listEl.length === 0 ? `Empty ${arrName}` : `${arrName}`}
         </Typography>
         {currentUser.is_admin && (
            <Box
               m={1}
               display="flex"
               justifyContent="flex-end"
               alignItems="flex-end"
            >
               <Button
                  variant="outlined"
                  size="small"
                  onClick={handleClickOpen}
               >
                  Add {title}
               </Button>
            </Box>
         )}
         <Grid container spacing={2}>
            {listEl}
         </Grid>
         <FormDialog
            arrName={arrName}
            arr={arr}
            addArr={addArr}
            setArr={setArr}
            initialData={initialData}
            open={open}
            serviceType={serviceType}
            setServiceType={setServiceType}
            duration={duration}
            setDuration={setDuration}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            serviceTypeOptions={serviceTypeOptions}
            durationOptions={durationOptions}
            functionTitle={functionTitle}
            title={title}
            endpoint={endpoint}
         />
      </Container>
   );
}

export default List;
