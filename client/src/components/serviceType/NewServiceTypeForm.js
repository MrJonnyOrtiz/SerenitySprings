import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function NewServiceTypeForm({ addServiceType }) {
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');

   const history = useHistory();

   const initialData = {
      service_type_name: '',
   };

   const { formData, handleChange } = useForm(initialData);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!formData.service_type_name) {
         setError('No service type entered');
      } else {
         // post it
         const configObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData }),
         };

         fetch(`/service_types`, configObj).then((res) => {
            if (res.ok) {
               res.json().then((newServiceType) => {
                  addServiceType(newServiceType);
                  setMessage(`${newServiceType.service_type_name} added`);
                  history.push('/service_types');
               });
            } else {
               res.json().then((data) =>
                  setError(data.errors.service_type_name[0])
               );
            }
         });
      }
   };

   return (
      <div>
         <div className="form-center">
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <label>
                     Service Type: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="service_type_name"
                        id="service_type_name"
                        value={formData.service_type_name}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>

               {error && (
                  <div className="error">
                     "{formData.service_type_name}" {error}
                  </div>
               )}
               {message && <div className="message">{message}</div>}

               <button className="btn-submit" type="submit">
                  Enter
               </button>
            </form>
         </div>
      </div>
   );
}

export default NewServiceTypeForm;
