import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function NewDurationForm({ addDuration }) {
   const [message, setMessage] = useState('');
   const [error, setError] = useState('');

   const history = useHistory();

   const initialData = {
      time_interval: '',
   };

   const { formData, handleChange } = useForm(initialData);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.time_interval < 0) {
         setError('Time interval cannot be negative');
      } else if (!(formData.time_interval % 15 === 0)) {
         setError('Time interval must be in 15 minute increments');
      } else {
         // post it
         const configObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData }),
         };

         fetch(`/durations`, configObj).then((res) => {
            if (res.ok) {
               res.json().then((newDuration) => {
                  addDuration(newDuration);
                  setMessage(`${newDuration.time_interval} minutes added`);
                  history.push('/durations');
               });
            } else {
               res.json().then((data) =>
                  setError(data.errors.time_interval[0])
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
                     Time interval: &nbsp;&nbsp;
                     <input
                        type="number"
                        step="15"
                        name="time_interval"
                        id="time_interval"
                        value={formData.time_interval}
                        onChange={handleChange}
                     />{' '}
                     (min)
                  </label>
               </fieldset>

               {error && (
                  <div className="error">
                     "{formData.time_interval}" {error}
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

export default NewDurationForm;
