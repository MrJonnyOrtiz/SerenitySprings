import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import Footer from './Footer';
import Login from './Login';
import Welcome from '../pages/Welcome';
import FormDialog from './FormDialog';

import List from './List';
import Button from '@mui/material/Button';

// import ServicesList from '../pages/ServicesList';
import NewServiceForm from './service/NewServiceForm';
import FavoritesList from '../pages/FavoritesList';
import Booking from '../pages/Booking';
import CartList from '../pages/CartList';
import About from '../pages/About';

function Main() {
   const [currentUser, setCurrentUser] = useState(null);
   const [durations, setDurations] = useState([]);
   const [serviceTypes, setServiceTypes] = useState([]);
   const [services, setServices] = useState([]);
   const [cart, setCart] = useState([]);
   const [open, setOpen] = useState(false);

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

   const handleDurations = (duration) => {
      setDurations(duration);
   };

   // GENERIC DELETE FUNCTIONS
   const deleteRecord = (arr, deletedElement, setArr) => {
      const updatedArr = arr.filter(
         (record) => record.id !== deletedElement.id
      );
      setArr(updatedArr);
   };

   const handleDelete = async (Id, endpoint, arr) => {
      const id = +Id.target.parentElement.parentElement.id;
      try {
         const response = await fetch(`/${endpoint}/${id}`, {
            method: 'DELETE',
         });
         if (response.ok) {
            const returnedData = await response.json();
            deleteRecord(arr, returnedData, handleDurations);
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
   // end GENERIC DELETE FUNCTIONS

   const handleServices = (service) => {
      setServices(service);
   };

   const handleCart = (cart) => {
      setCart(cart);
   };

   function addCartItem(newServiceItem) {
      setCart((cart) => [...cart, newServiceItem]);
   }

   function addDuration(newDuration) {
      setDurations((durations) => [...durations, newDuration]);
   }

   function addServiceType(newServiceType) {
      setServiceTypes((serviceTypes) => [...serviceTypes, newServiceType]);
   }

   function addService(newService) {
      setServices((services) => [...services, newService]);
   }

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
               {currentUser.is_admin && (
                  <FormDialog
                     arrName="Durations"
                     arr={durations}
                     addArr={addDuration}
                     initialData={{ time_interval: '' }}
                     title="duration"
                     endpoint="durations"
                     open={true}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  />
               )}
            </Route>

            <Route path="/durations">
               <List
                  arrName="Durations"
                  arr={durations}
                  addArr={addDuration}
                  initialData={{ time_interval: '' }}
                  endpoint="durations"
                  title="duration"
                  currentUser={currentUser}
                  open={open}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
               >
                  <Button
                     variant="outlined"
                     size="small"
                     onClick={(Id) => {
                        handleDelete(Id, 'durations', durations);
                     }}
                  >
                     Delete
                  </Button>
               </List>
            </Route>

            <Route path="/service_types/new">
               {currentUser.is_admin && (
                  <FormDialog
                     arrName="Service Types"
                     arr={serviceTypes}
                     addArr={addServiceType}
                     initialData={{ service_type_name: '' }}
                     title="service type"
                     endpoint="service_types"
                     open={true}
                     handleClickOpen={handleClickOpen}
                     handleClose={handleClose}
                  />
               )}
            </Route>

            <Route path="/service_types">
               <List
                  arrName="Service Types"
                  arr={serviceTypes}
                  addArr={addServiceType}
                  initialData={{ service_type_name: '' }}
                  endpoint="service_types"
                  title="service type"
                  currentUser={currentUser}
                  open={open}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
               >
                  <Button
                     variant="outlined"
                     size="small"
                     onClick={(Id) => {
                        handleDelete(Id, 'service_types', serviceTypes);
                     }}
                  >
                     Delete
                  </Button>
               </List>
            </Route>

            <Route exact path="/services/new">
               <NewServiceForm
                  addService={addService}
                  durations={durations}
                  serviceTypes={serviceTypes}
               />
            </Route>

            <Route path="/services">
               {/* <ServicesList
                  currentUser={currentUser}
                  services={services}
                  addService={addService}
                  updateService={updateService}
                  handleServices={handleServices}
                  durations={durations}
                  serviceTypes={serviceTypes}
                  cart={cart}
                  addCartItem={addCartItem}
                  handleFave={handleFave}
                  handleCart={handleCart}
               /> */}
               <List
                  arrName="Services"
                  arr={services}
                  addArr={addService}
                  initialData={{ service_type_name: '' }}
                  endpoint="services"
                  title="services"
                  currentUser={currentUser}
                  open={open}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
               >
                  {currentUser.is_admin && (
                     <>
                        <Button
                           variant="outlined"
                           size="small"
                           onClick={(Id) => {
                              handleDelete(Id, 'services', services);
                           }}
                        >
                           Edit
                        </Button>
                        <Button
                           variant="outlined"
                           size="small"
                           onClick={(Id) => {
                              handleDelete(Id, 'services', services);
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
               <FavoritesList
                  currentUser={currentUser}
                  handleCurrentUser={handleCurrentUser}
               />
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
