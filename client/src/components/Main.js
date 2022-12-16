import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import Footer from './Footer';
import Login from './Login';
import Welcome from '../pages/Welcome';
import FormDialog from './FormDialog';
import List from './List';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Booking from '../pages/Booking';
import CartList from '../pages/CartList';
import About from '../pages/About';

function Main() {
   const [durations, setDurations] = useState([]);
   const [serviceTypes, setServiceTypes] = useState([]);
   const [currentUser, setCurrentUser] = useState(null);
   const [services, setServices] = useState([]);
   const [cart, setCart] = useState([]);
   const [open, setOpen] = useState(false);
   const [serviceType, setServiceType] = useState(5); // hardcoded to Salon
   // const [serviceType, setServiceType] = useState(0);

   const [duration, setDuration] = useState(25); // hardcoded duration to 0 minutes
   // const [duration, setDuration] = useState(0);

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

   const handleCart = (cart) => {
      setCart(cart);
   };

   const addCartItem = (newServiceItem) => {
      setCart((cart) => [...cart, newServiceItem]);
   };

   function updateService(updatedService) {
      const updatedServices = services.map((ogService) =>
         ogService.id === updatedService.id ? updatedService : ogService
      );
      setServices(updatedServices);
   }

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

   // TODO: initialize service type id & duration id to avoid hardcoding

   // const initServiceTypeId = setServiceType(() => {
   //    const { id } = serviceTypes.find(
   //       (service_type) => service_type.service_type_name === 'Salon'
   //    );
   //    return id;
   // });

   // const initDurationId = setDuration(() => {
   //    const { id } = durations.find((duration) => duration.time_interval === 0);
   //    return id;
   // });

   if (!currentUser) return <Login handleCurrentUser={handleCurrentUser} />;

   // TODO: WHEN PUSHING TO HEROKU, CHANGE TO NOT ADMIN TO ALLOW ADMIN TO ADD SERVICE TYPES, DURATIONS, & SERVICES
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
            handleCart={handleCart}
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
                     endpoint="durations"
                     open={true}
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     durations={duration}
                     setDurations={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
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
                     endpoint="service_types"
                     open={true}
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     durations={duration}
                     setDurations={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
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
                     currentUser={currentUser}
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
                     endpoint="services"
                     serviceType={serviceType}
                     setServiceType={setServiceType}
                     durations={duration}
                     setDurations={setDuration}
                     serviceTypeOptions={serviceTypeOptions}
                     durationOptions={durationOptions}
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
                  currentUser={currentUser}
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
                           onClick={(Id) => {
                              console.log(
                                 Id.target.parentElement.parentElement.id
                              );
                           }}
                        >
                           Edit
                        </Button>
                        <Button
                           variant="outlined"
                           size="small"
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
                           onClick={(Id) => {
                              handleFave(Id, 'favorites');
                           }}
                        >
                           Fave Me!
                        </Button>
                        <Button
                           variant="outlined"
                           size="small"
                           onClick={(Id) => {
                              addCartItem(Id, 'services', services);
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
                     currentUser={currentUser}
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
                        onClick={(Id) => {
                           addCartItem(Id, 'services', services);
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
               <CartList cart={cart} setCart={handleCart} />
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
            handleCart={handleCart}
         />
      </div>
   );
}

export default Main;
