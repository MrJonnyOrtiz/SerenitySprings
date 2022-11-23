import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import Footer from './Footer';
import Login from './Login';
import Welcome from '../pages/Welcome';
import NewDurationForm from './duration/NewDurationForm';
import DurationsList from '../pages/DurationsList';
import NewServiceTypeForm from './serviceType/NewServiceTypeForm';
import ServiceTypeList from '../pages/ServiceTypeList';
import ServicesList from '../pages/ServicesList';
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

   const handleCurrentUser = (user) => {
      setCurrentUser(user);
   };

   const handleDurations = (duration) => {
      setDurations(duration);
   };

   const handleServiceTypes = (serviceType) => {
      setServiceTypes(serviceType);
   };

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

   const handleFave = (id) => {
      const configObj = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            wishlist_id: currentUser.wishlist.id,
            service_id: id,
         }),
      };

      fetch(`/favorites`, configObj).then((res) => {
         if (res.ok) {
            res.json().then((newFavorite) => {
               fetch(`/users/${currentUser.id}`).then((res) => {
                  if (res.ok)
                     res.json().then((user) => handleCurrentUser(user));
               });
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
               <NewDurationForm addDuration={addDuration} />
            </Route>

            <Route path="/durations">
               <DurationsList
                  durations={durations}
                  addDuration={addDuration}
                  handleDurations={handleDurations}
               />
            </Route>

            <Route path="/service_types/new">
               <NewServiceTypeForm addServiceType={addServiceType} />
            </Route>

            <Route path="/service_types">
               <ServiceTypeList
                  serviceTypes={serviceTypes}
                  addServiceType={addServiceType}
                  handleServiceTypes={handleServiceTypes}
               />
            </Route>

            <Route exact path="/services/new">
               <NewServiceForm
                  addService={addService}
                  durations={durations}
                  serviceTypes={serviceTypes}
               />
            </Route>

            <Route path="/services">
               <ServicesList
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
               />
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
