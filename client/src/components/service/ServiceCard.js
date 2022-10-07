import { useState } from 'react';
import Modal from 'react-modal';
import EditServiceForm from './EditServiceForm';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ServiceCard({
   currentUser,
   service,
   deleteService,
   updateService,
   serviceTypes,
   durations,
   cart,
   addCartItem,
   handleFave,
   handleCart,
}) {
   const [modalIsOpen, setIsOpen] = useState(false);

   const customStyles = {
      content: {
         top: '50%',
         left: '50%',
         right: 'auto',
         bottom: 'auto',
         marginRight: '-50%',
         transform: 'translate(-50%, -50%)',
      },
   };

   Modal.setAppElement('#root');

   let subtitle;

   function openModal() {
      setIsOpen(true);
   }

   function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
   }

   function closeModal() {
      setIsOpen(false);
   }

   const {
      id,
      name,
      description,
      price,
      image_url,
      service_type_name,
      time_interval,
   } = service;

   const handleDelete = () => {
      fetch(`/services/${id}`, {
         method: 'DELETE',
      });

      deleteService(service);
   };

   const foundFave = currentUser.favorites.find(
      ({ service_id }) => service_id === id
   );

   const foundCartItem = cart.find(({ id }) => service.id === id);

   return (
      <Paper elevation={5} key={id}>
         <div className="center">
            <img className="center" src={image_url} alt={name} />
         </div>
         <Typography component="h2" variant="h5">
            {name}
         </Typography>
         <Box sx={{ textAlign: 'center' }} paddingX={1}>
            <Typography component="h3" variant="h6">
               <Box>{description}</Box>
               <Box>Price: {price === 0 ? 'Free!' : `$ ${price}`}</Box>
               <Box>Service Type: {service_type_name}</Box>
               <Box>
                  {service_type_name === 'Spa' && (
                     <>Duration: {time_interval} mins</>
                  )}
               </Box>
            </Typography>
         </Box>{' '}
         <div className="card-actions">
            {currentUser.is_admin && (
               <>
                  <button className="add-button" onClick={openModal}>
                     edit
                  </button>

                  <Modal
                     isOpen={modalIsOpen}
                     onAfterOpen={afterOpenModal}
                     onRequestClose={closeModal}
                     style={customStyles}
                     contentLabel="Example Modal"
                  >
                     <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                        Update Service
                     </h2>
                     <EditServiceForm
                        service={service}
                        updateService={updateService}
                        durations={durations}
                        serviceTypes={serviceTypes}
                     />
                     <button onClick={closeModal}>close</button>
                  </Modal>
                  <button onClick={handleDelete}>delete</button>
               </>
            )}
            {!currentUser.is_admin && !foundFave ? (
               <button onClick={() => handleFave(id)}>❤️ fave me</button>
            ) : (
               !currentUser.is_admin && (
                  <span className="notification">faved!</span>
               )
            )}
            {!currentUser.is_admin && !foundCartItem ? (
               <button onClick={() => addCartItem(service)}>
                  🛒 add to cart
               </button>
            ) : (
               !currentUser.is_admin && (
                  <span className="notification">added to cart!</span>
               )
            )}
         </div>
      </Paper>
   );
}

export default ServiceCard;
