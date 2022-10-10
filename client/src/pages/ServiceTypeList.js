import { useState } from 'react';
import ServiceTypeCard from '../components/serviceType/ServiceTypeCard';
import NewServiceTypeForm from '../components/serviceType/NewServiceTypeForm';
import Modal from 'react-modal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function ServiceTypeList({ serviceTypes, addServiceType, handleServiceTypes }) {
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

   useDocumentTitle('Serenity Springs - Service Type List');

   const deleteServiceType = (deletedServiceType) => {
      const updatedServiceTypes = serviceTypes.filter(
         (serviceType) => serviceType.id !== deletedServiceType.id
      );
      handleServiceTypes(updatedServiceTypes);
   };

   const serviceTypeEl = serviceTypes.map((serviceType) => (
      <ServiceTypeCard
         key={serviceType.id}
         serviceType={serviceType}
         deleteServiceType={deleteServiceType}
      />
   ));

   return (
      <div>
         <h2>All Service Types</h2>
         <div className="add-btn-container">
            <button className="add-button" onClick={openModal}>
               ➕ Add Service Type
            </button>
         </div>

         <div className="wrapper"> {serviceTypeEl}</div>

         <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
         >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
               Add Service Type
            </h2>
            <NewServiceTypeForm addServiceType={addServiceType} />
            <button onClick={closeModal}>close</button>
         </Modal>
      </div>
   );
}

export default ServiceTypeList;
