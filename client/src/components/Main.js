import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import Footer from './Footer';
import Login from './Login';
import Welcome from '../pages/Welcome';
import FormDialog from './FormDialog';
import List from './List';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Booking from '../pages/Booking';
// import CartList from '../pages/CartList';
import About from '../pages/About';

function Main() {
   const [durations, setDurations] = useState([]);
   const [serviceTypes, setServiceTypes] = useState([]);
   const [currentUser, setCurrentUser] = useState(null);
   const [services, setServices] = useState([]);
   const [cart, setCart] = useState(
      JSON.parse(localStorage.getItem('cart')) || []
   );
   const [open, setOpen] = useState(false);

   // TODO: figure out how to dynamically initialize serviceType and duration
   const [serviceType, setServiceType] = useState(5); // hardcoded to Salon
   const [duration, setDuration] = useState(25); // hardcoded duration to 0 minutes

   useEffect(() => {
      fetch('/authorized_user').then((res) => {
         if (res.ok) {
            res.json().then((user) => setCurrentUser(user));
         } else {
            console.log('You are not logged in. Please login.');
         }
      });
   }, []);

   useEffect(() => {
      if (currentUser && currentUser.is_admin) {
         fetch('/durations').then((res) => {
            if (res.ok) {
               res.json().then((duration) => setDurations(duration));
            } else {
               console.log('No durations');
            }
         });
      }
   }, [currentUser]);

   useEffect(() => {
      if (currentUser && currentUser.is_admin) {
         fetch('/service_types').then((res) => {
            if (res.ok) {
               res.json().then((serviceType) => setServiceTypes(serviceType));
            } else {
               console.log('No service types');
            }
         });
      }
   }, [currentUser]);

   useEffect(() => {
      fetch('/services').then((res) => {
         if (res.ok) {
            res.json().then((service) => setServices(service));
         } else {
            console.log('No services');
         }
      });
   }, []);

   useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
   }, [cart]);

   const history = useHistory();

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleCurrentUser = (user) => {
      setCurrentUser(user);
   };

   const deleteRecord = (arr, deletedElement, handleArr) => {
      const updatedArr = arr.filter(
         (record) => record.id !== deletedElement.id
      );
      handleArr(updatedArr);
   };

   const handleDelete = async (Id, endpoint, arr, handleArr) => {
      const id = +Id.target.parentElement.parentElement.id;
      try {
         const response = await fetch(`/${endpoint}/${id}`, {
            method: 'DELETE',
         });
         if (response.ok) {
            const returnedData = await response.json();
            deleteRecord(arr, returnedData, handleArr);
         } else {
            const { errors } = await response.json();
            throw new Error(
               `Problem with delete: ${errors} ${response.status}: ${response.statusText}`
            );
         }
      } catch (error) {
         alert(error);
      }
   };

   const addArr = (arr, newObj, setArr) => {
      setArr((arr) => [...arr, newObj]);
   };

   const handleAddCartItem = (Id, caller) => {
      const id = +Id.target.parentElement.parentElement.id;
      let newCartItem = {};
      switch (caller) {
         case 'service':
            newCartItem = services.find((item) => item.id === id);
            break;

         case 'favorite':
            const favoriteItem = currentUser.favorites.find(
               (favorite) => favorite.id === id
            );
            newCartItem = services.find(
               (item) => item.id === favoriteItem.service_id
            );
            break;

         default:
            break;
      }
      Object.keys(newCartItem).length !== 0 && setCart([...cart, newCartItem]);
   };

   const updateService = (updatedService) => {
      const updatedServices = services.map((ogService) =>
         ogService.id === updatedService.id ? updatedService : ogService
      );
      setServices(updatedServices);
   };

   const handleFave = async (Id, endpoint) => {
      const id = +Id.target.parentElement.parentElement.id;

      try {
         const configObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               wishlist_id: currentUser.wishlist.id,
               service_id: id,
            }),
         };

         const response = await fetch(`/${endpoint}`, configObj);

         if (response.ok) {
            response.json().then((newFavorite) => {
               fetch(`/users/${currentUser.id}`).then((res) => {
                  if (res.ok)
                     res.json().then((user) => handleCurrentUser(user));
               });
            });
         } else {
            const { errors } = await response.json();
            throw new Error(
               `Problem with fave: ${errors} ${response.status}: ${response.statusText}`
            );
         }
      } catch (error) {
         alert(error);
      }
   };

   const handleDeleteFave = async (Id) => {
      const id = +Id.target.parentElement.parentElement.id;
      try {
         const response = await fetch(`/favorites/${id}`, {
            method: 'DELETE',
         });
         if (response.ok) {
            response.json().then((deletedFave) => {
               fetch(`/users/${currentUser.id}`).then((response) => {
                  if (response.ok)
                     response
                        .json()
                        .then((updatedUser) => handleCurrentUser(updatedUser));
               });
            });
         } else {
            const { errors } = await response.json();
            throw new Error(
               `Problem with delete: ${errors} ${response.status}: ${response.statusText}`
            );
         }
      } catch (error) {
         alert(error);
      }
   };

   const serviceTypeOptions = serviceTypes.map((serviceType) => {
      return { label: serviceType.service_type_name, value: serviceType.id };
   });

   const durationOptions = durations.map((duration) => {
      return { label: duration.time_interval, value: duration.id };
   });

   const handleServiceEdit = async (Id, endpoint) => {
      const id = Id.target.parentElement.parentElement.id;
      history.push(`/services/${id}/edit`);
   };

   if (!currentUser) return <Login handleCurrentUser={handleCurrentUser} />;

   // NOTE: WHEN PUSHING TO HEROKU, CHANGE TO NOT ADMIN TO ALLOW ADMIN TO ADD SERVICE TYPES, DURATIONS, & SERVICES
   // if (!currentUser.is_admin) {
   //    if (!services.length || !durations.length || !serviceTypes.length) {
   //       return <h2>Loading..</h2>;
   //    }
   // }
   return (
      <div>
         <AppBar
            currentUser={currentUser}
            handleCurrentUser={handleCurrentUser}
            cart={cart}
            handleCart={setCart}
         />
         <Switch>
            <Route path="/durations/new">
               {currentUser.is_admin ? (
                  <FormDialog
                     arrName="Durations"
                     arr={durations}
                     addArr={addArr}
                     setArr={setDurations}
                     initialData={{ time_interval: '' }}
                     title="duration"
                     functionTitle={'Add'}
                     endpoint="durations"
                     open={true}
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     durations={duration}
                     setDurations={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
                     updateService={updateService}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  />
               ) : (
                  <Box
                     mt={2}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                  >
                     <Alert severity="error" variant="outlined">
                        <AlertTitle>Not Authorized</AlertTitle>You are not
                        authorized to this path.
                     </Alert>
                  </Box>
               )}
            </Route>

            <Route path="/durations">
               {currentUser.is_admin ? (
                  <List
                     arrName="Durations"
                     arr={durations}
                     addArr={addArr}
                     setArr={setDurations}
                     initialData={{ time_interval: '' }}
                     endpoint="durations"
                     title="duration"
                     currentUser={currentUser}
                     cart={cart}
                     open={open}
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     duration={duration}
                     setDuration={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
                     functionTitle={'Add'}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  >
                     <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteOutlinedIcon />}
                        onClick={(Id) => {
                           handleDelete(
                              Id,
                              'durations',
                              durations,
                              setDurations
                           );
                        }}
                     >
                        Delete
                     </Button>
                  </List>
               ) : (
                  <Box
                     mt={2}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                  >
                     <Alert severity="error" variant="outlined">
                        <AlertTitle>Not Authorized</AlertTitle>You are not
                        authorized to this path.
                     </Alert>
                  </Box>
               )}
            </Route>

            <Route path="/service_types/new">
               {currentUser.is_admin ? (
                  <FormDialog
                     arrName="Service Types"
                     arr={serviceTypes}
                     addArr={addArr}
                     setArr={setServiceTypes}
                     initialData={{ service_type_name: '' }}
                     title="service type"
                     functionTitle={'Add'}
                     endpoint="service_types"
                     open={true}
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     durations={duration}
                     setDurations={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
                     updateService={updateService}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  />
               ) : (
                  <Box
                     mt={2}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                  >
                     <Alert severity="error" variant="outlined">
                        <AlertTitle>Not Authorized</AlertTitle>You are not
                        authorized to this path.
                     </Alert>
                  </Box>
               )}
            </Route>

            <Route path="/service_types">
               {currentUser.is_admin ? (
                  <List
                     arrName="Service Types"
                     arr={serviceTypes}
                     addArr={addArr}
                     setArr={setServiceTypes}
                     initialData={{ service_type_name: '' }}
                     endpoint="service_types"
                     title="service type"
                     functionTitle={'Add'}
                     currentUser={currentUser}
                     cart={cart}
                     open={open}
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     durations={duration}
                     setDurations={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  >
                     <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteOutlinedIcon />}
                        onClick={(Id) => {
                           handleDelete(
                              Id,
                              'service_types',
                              serviceTypes,
                              setServiceTypes
                           );
                        }}
                     >
                        Delete
                     </Button>
                  </List>
               ) : (
                  <Box
                     mt={2}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                  >
                     <Alert severity="error" variant="outlined">
                        <AlertTitle>Not Authorized</AlertTitle>You are not
                        authorized to this path.
                     </Alert>
                  </Box>
               )}
            </Route>

            <Route exact path="/services/new">
               {currentUser.is_admin ? (
                  <FormDialog
                     arrName="Services"
                     arr={services}
                     addArr={addArr}
                     setArr={setServices}
                     // by default, make a new service be Salon type with 0 minutes for UI
                     initialData={{
                        name: '',
                        description: '',
                        price: '',
                        image_url: '',
                        service_type_id: `${serviceType}`,
                        duration_id: `${duration}`,
                     }}
                     title="service"
                     functionTitle={'Add'}
                     endpoint="services"
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     durations={duration}
                     setDurations={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
                     updateService={updateService}
                     open={true}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  />
               ) : (
                  <Box
                     mt={2}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                  >
                     <Alert severity="error" variant="outlined">
                        <AlertTitle>Not Authorized</AlertTitle>You are not
                        authorized to this path.
                     </Alert>
                  </Box>
               )}
            </Route>

            <Route
               exact
               path="/services/:id/edit"
               render={({ match }) => (
                  <FormDialog
                     arrName="Services"
                     arr={services}
                     addArr={addArr}
                     setArr={setServices}
                     initialData={services.find(
                        (service) => service.id === parseInt(match.params.id)
                     )}
                     title="service"
                     functionTitle={'Edit'}
                     endpoint="services"
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     durations={duration}
                     setDurations={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
                     updateService={updateService}
                     open={true}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  />
               )}
            />

            <Route path="/services">
               <List
                  arrName="Services"
                  arr={services}
                  addArr={addArr}
                  setArr={setServices}
                  initialData={{
                     name: '',
                     description: '',
                     price: '',
                     image_url: '',
                     service_type_id: `${serviceType}`,
                     duration_id: `${duration}`,
                  }}
                  endpoint="services"
                  title="service"
                  functionTitle={'Add'}
                  currentUser={currentUser}
                  cart={cart}
                  open={open}
                  serviceType={serviceType}
                  setServiceType={setServiceType}
                  duration={duration}
                  setDuration={setDuration}
                  serviceTypeOptions={serviceTypeOptions}
                  durationOptions={durationOptions}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
               >
                  {currentUser.is_admin && (
                     <>
                        <Button
                           variant="outlined"
                           size="small"
                           startIcon={<EditOutlinedIcon />}
                           onClick={(Id) => {
                              handleServiceEdit(Id, 'services');
                           }}
                        >
                           Edit
                        </Button>
                        <Button
                           variant="outlined"
                           size="small"
                           startIcon={<DeleteOutlinedIcon />}
                           onClick={(Id) => {
                              handleDelete(
                                 Id,
                                 'services',
                                 services,
                                 setServices
                              );
                           }}
                        >
                           Delete
                        </Button>
                     </>
                  )}
                  {!currentUser.is_admin && (
                     <>
                        <Button
                           variant="outlined"
                           size="small"
                           startIcon={<FavoriteBorderIcon />}
                           onClick={(Id) => {
                              handleFave(Id, 'favorites');
                           }}
                        >
                           Fave Me!
                        </Button>
                        <Button
                           variant="outlined"
                           size="small"
                           startIcon={<AddShoppingCartOutlinedIcon />}
                           onClick={(Id) => {
                              handleAddCartItem(Id, 'service');
                           }}
                        >
                           Add to Cart
                        </Button>
                     </>
                  )}
               </List>
            </Route>

            <Route path="/favorites">
               {!currentUser.is_admin ? (
                  <List
                     arrName="Favorites"
                     arr={currentUser.favorites}
                     addArr={addArr}
                     setArr={handleCurrentUser}
                     initialData={{
                        wishlist_id: 0,
                        service_id: 0,
                     }}
                     endpoint="favorites"
                     title="favorite"
                     functionTitle={'Add'}
                     currentUser={currentUser}
                     cart={cart}
                     open={open}
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     duration={duration}
                     setDuration={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  >
                     <Button
                        variant="outlined"
                        size="small"
                        startIcon={<HeartBrokenOutlinedIcon />}
                        onClick={(Id) => {
                           handleDeleteFave(
                              Id,
                              'favorite',
                              currentUser.favorites,
                              handleCurrentUser
                           );
                        }}
                     >
                        UnFave
                     </Button>
                     <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddShoppingCartOutlinedIcon />}
                        onClick={(Id) => {
                           handleAddCartItem(Id, 'favorite');
                        }}
                     >
                        Add to Cart
                     </Button>
                  </List>
               ) : (
                  <Box
                     mt={2}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                  >
                     <Alert severity="error" variant="outlined">
                        <AlertTitle>Not Authorized</AlertTitle>You are not
                        authorized to this path.
                     </Alert>
                  </Box>
               )}
            </Route>

            <Route path="/bookings">
               <Booking />
            </Route>

            <Route path="/cart">
               {/* <CartList cart={cart} setCart={handleCart} /> */}
               {!currentUser.is_admin ? (
                  <List
                     arrName="Cart"
                     arr={cart}
                     addArr={{}} // to add new but n/a for cart
                     setArr={{}} // array setter, n/a for cart
                     initialData={{}} // to add new but n/a for cart
                     endpoint="" // to add new but n/a for cart
                     title="favorite"
                     functionTitle={''} // to add new or edit but n/a for cart
                     currentUser={currentUser}
                     cart={cart}
                     open={open}
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     duration={duration}
                     setDuration={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  >
                     <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteOutlinedIcon />}
                        onClick={(Id) => {
                           const id = +Id.target.parentElement.parentElement.id;
                           const cartElement = cart.find(
                              (element) => element.id === id
                           );
                           deleteRecord(cart, cartElement, setCart);
                        }}
                     >
                        Delete
                     </Button>
                     <Button
                        variant="outlined"
                        size="small"
                        startIcon={<InventoryOutlinedIcon />}
                        onClick={(Id) => {
                           // TODO: book service
                           console.log(Id);
                        }}
                     >
                        Buy & Book!
                     </Button>
                  </List>
               ) : (
                  <Box
                     mt={2}
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                  >
                     <Alert severity="error" variant="outlined">
                        <AlertTitle>Not Authorized</AlertTitle>You are not
                        authorized to this path.
                     </Alert>
                  </Box>
               )}
            </Route>

            <Route path="/about">
               <About />
            </Route>

            <Route path="/login">
               <Login handleCurrentUser={handleCurrentUser} />
            </Route>

            <Route exact path="/">
               <Welcome currentUser={currentUser} />
            </Route>
         </Switch>
         <Footer
            currentUser={currentUser}
            handleCurrentUser={handleCurrentUser}
            cart={cart}
            handleCart={setCart}
         />
      </div>
   );
}

export default Main;
