import { useState } from 'react';
import DurationCard from './DurationCard';
import NewDurationForm from './NewDurationForm';
import Modal from 'react-modal';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

function DurationsList({ durations, addDuration, handleDurations }) {
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

   useDocumentTitle('Serenity Springs - Duration List');

   const deleteDuration = (deletedDuration) => {
      const updatedDurations = durations.filter(
         (duration) => duration.id !== deletedDuration.id
      );
      handleDurations(updatedDurations);
   };

   const durationEl = durations.map((duration) => (
      <DurationCard
         key={duration.id}
         duration={duration}
         deleteDuration={deleteDuration}
      />
   ));

   return (
      <div>
         <h2>All Durations</h2>
         <div className="add-btn-container">
            <button className="add-button" onClick={openModal}>
               ➕ Add Duration
            </button>
         </div>

         <div className="wrapper"> {durationEl}</div>

         <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
         >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Duration</h2>
            <NewDurationForm addDuration={addDuration} />
            <button onClick={closeModal}>close</button>
         </Modal>
      </div>
   );
}

export default DurationsList;
