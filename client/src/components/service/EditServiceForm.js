import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

const Dropdown = ({ label, value, options, handleChange, shoeTypes }) => {
   return (
      <label>
         {label}
         <select value={value} onChange={handleChange}>
            {options.map((option) => (
               <option key={option.value} value={option.value}>
                  {option.label}
               </option>
            ))}
         </select>
      </label>
   );
};

function EditServiceForm({ service, updateService, serviceTypes, durations }) {
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');
   const [serviceType, setServiceType] = useState(() => {
      const { id } = serviceTypes.find(
         (service_type) =>
            service_type.service_type_name === service.service_type_name
      );
      return id;
   });
   const [duration, setDuration] = useState(() => {
      const { id } = durations.find(
         (duration) => duration.time_interval === service.time_interval
      );
      return id;
   });

   const history = useHistory();

   const {
      id,
      name,
      description,
      price,
      image_url,
      service_type_id,
      duration_id,
   } = service;

   const initialData = {
      name: name,
      description: description,
      price: price,
      image_url: image_url,
      service_type_id: service_type_id,
      duration_id: duration_id,
   };

   const { formData, handleChange } = useForm(initialData);

   const serviceTypeOptions = serviceTypes.map((serviceType) => {
      return { label: serviceType.service_type_name, value: serviceType.id };
   });

   const handleServiceTypeChange = (e) => {
      setServiceType(e.target.value);
   };

   const durationOptions = durations.map((duration) => {
      return { label: duration.time_interval, value: duration.id };
   });

   const handleDurationChange = (e) => {
      setDuration(e.target.value);
   };

   // on form submit, patch and reset state and push to services page

   const handleSubmit = (e) => {
      e.preventDefault();

      const configObj = {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
      };

      fetch(`/services/${id}`, configObj).then((res) => {
         if (res.ok) {
            res.json().then((updatedService) => {
               updateService(updatedService);
               setMessage(`${updatedService.name} updated!`);
               history.push('/services');
            });
         } else {
            res.json().then((data) => {
               Object.entries(data.errors).length > 1
                  ? setError('multiple errors on the form')
                  : setError(
                       Object.entries(data.errors).toString().replace(',', '. ')
                    );

               // TODO: maybe iterate over data.errors using Object.entries that returns an array of keys and values, then setError?
               //    Object.entries(data.errors).forEach((errorArr) => {
               //       const [errorName, errorMsg] = errorArr;
               //       setError(errorArr);
               //    });
               // EXAMPLES:
               //   setError(data.errors.service_type_name[0])
               // data.errors.description[0]
               // data.errors.price[0]
               // data.errors.service_type[0]
               // data.errors.image_url[0]
            });
         }
      });
   };

   return (
      <div>
         <div className="form-center">
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <label>
                     Service Name: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={name}
                        value={formData.name}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Description: &nbsp;&nbsp;
                     <textarea
                        name="description"
                        id="description"
                        placeholder={description}
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        cols="30"
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Price: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="price"
                        placeholder={price}
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Image URL: &nbsp;&nbsp;
                     <input
                        type="url"
                        name="image_url"
                        placeholder={image_url}
                        id="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <Dropdown
                     label="Select service type: "
                     options={serviceTypeOptions}
                     value={serviceType}
                     handleChange={handleServiceTypeChange}
                  />
               </fieldset>

               {/* TODO: lookup Salon's id in Heroku & change below test before pushing to Heroku (it's 3 in the local db) */}

               {serviceType === '4' && (
                  <fieldset>
                     <Dropdown
                        label="Select duration: "
                        options={durationOptions}
                        value={duration}
                        handleChange={handleDurationChange}
                     />
                  </fieldset>
               )}
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

export default EditServiceForm;
