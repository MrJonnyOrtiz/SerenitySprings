import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({
   serviceType,
   initialData,
   arr,
   arrName,
   addArr,
   setArr,
   open,
   setServiceType,
   duration,
   setDuration,
   serviceTypeOptions,
   durationOptions,
   handleClickOpen,
   handleClose,
   title,
   endpoint,
}) {
   const history = useHistory();

   const { formData, handleChange } = useForm(initialData);

   const Dropdown = ({ label, value, options, handleChange, shoeTypes }) => {
      return (
         <label>
            <DialogContentText>{label}</DialogContentText>
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

   const initialDataKeys = Object.keys(initialData);

   const handleSubmit = (e) => {
      e.preventDefault();

      function postData(dataObj, objKey) {
         const configObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...dataObj }),
         };

         fetch(`/${endpoint}`, configObj).then((res) => {
            if (res.ok) {
               res.json().then((newPostedObj) => {
                  addArr(arr, newPostedObj, setArr);

                  //TODO - refactor success notification
                  alert(`${dataObj[objKey]} added`);

                  history.push(`/${arrName.toLowerCase()}`);
               });
            } else {
               res.json().then((data) => {
                  //TODO - refactor error notification
                  data.errors.time_interval[0]
                     ? alert(
                          `${dataObj[objKey]} ${data.errors.time_interval[0]}`
                       )
                     : alert(JSON.stringify(data.errors));
               });
            }
         });
      }

      // validations
      initialDataKeys.forEach((objKey) => {
         if (objKey === 'time_interval') {
            const time_intervalInt = parseInt(formData.time_interval);
            if (time_intervalInt < 0) {
               //TODO - refactor error notification
               alert(
                  `Time interval entered ${time_intervalInt} cannot be negative`
               );
            } else if (!(time_intervalInt % 15 === 0)) {
               //TODO - refactor error notification
               alert(
                  `Time interval entered ${time_intervalInt} must be in 15 minute increments`
               );
            } else {
               postData(formData, objKey);
            }
         } else {
            // objKey is not time_interval
            // TODO - add validation for price
            postData(formData, objKey);
         }
      });
   };

   // Input Element(s)
   const inputEl = initialDataKeys.map((objKey) => (
      <Box key={objKey} mb={2}>
         <DialogContentText>
            {objKey !== 'service_type_id' && objKey !== 'duration_id' && objKey}
         </DialogContentText>

         {(objKey === 'service_type_id' && (
            <Dropdown
               label="Select service type"
               options={serviceTypeOptions}
               value={serviceType}
               handleChange={setServiceType}
            />
         )) ||
            (objKey === 'duration_id' && (
               <Dropdown
                  label="Select duration (minutes)"
                  options={durationOptions}
                  value={duration}
                  handleChange={setDuration}
               />
            )) || (
               <TextField
                  name={objKey}
                  id={objKey}
                  value={formData[objKey]}
                  onChange={handleChange}
               />
            )}
      </Box>
   ));

   return (
      <div>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add {title}</DialogTitle>
            <DialogContent>
               {initialDataKeys.length === 1 ? (
                  <Box key={initialDataKeys[0]}>
                     <DialogContentText>Enter a {title}</DialogContentText>
                     <TextField
                        name={initialDataKeys[0]}
                        id={initialDataKeys[0]}
                        value={formData[initialDataKeys[0]]}
                        onChange={handleChange}
                     />
                  </Box>
               ) : (
                  inputEl
               )}
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleSubmit}>Add {title}</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
