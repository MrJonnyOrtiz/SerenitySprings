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
   initialData,
   arr,
   arrName,
   addArr,
   setArr,
   open,
   serviceType,
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

   const Dropdown = ({ label, value, options, handleChange }) => {
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

   const initialDataEntries = Object.entries(initialData);

   const handleDropDownChange = (e, setArr) => {
      setArr(e.target.value);
   };

   const postData = (dataObj, objKey) => {
      const configObj = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ ...dataObj }),
      };

      fetch(`/${endpoint}`, configObj).then((res) => {
         if (res.ok) {
            res.json().then((newPostedObj) => {
               addArr(arr, newPostedObj, setArr);

               //TODO: - refactor success notification
               alert(`Data added`);

               history.push(`/${arrName.toLowerCase()}`);
            });
         } else {
            res.json().then((data) => {
               //TODO: - refactor error notification
               data.errors.time_interval[0]
                  ? alert(`${dataObj[objKey]} ${data.errors.time_interval[0]}`)
                  : alert(JSON.stringify(data.errors));
            });
         }
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      // Form data validations & post
      initialDataKeys.forEach((objKey) => {
         switch (objKey) {
            case 'time_interval':
               const timeIntervalInt = parseInt(formData[objKey]);
               if (timeIntervalInt < 0) {
                  //TODO: - refactor error notification
                  alert(
                     `Time interval entered ${timeIntervalInt} cannot be negative.`
                  );
               } else if (!(timeIntervalInt % 15 === 0)) {
                  //TODO: - refactor error notification
                  alert(`${timeIntervalInt} not in 15 minute increments.`);
               } else {
                  postData(formData, objKey);
               }
               break;

            case 'service_type_name':
               // console.log(typeof formData[objKey], objKey);

               if (
                  objKey !== 'Spa' ||
                  objKey !== 'Salon' ||
                  objKey !== 'Products'
               ) {
                  alert(`${formData[objKey]} not a valid service.`);
               } else {
                  postData(formData, objKey);
               }

               break;

            case 'price':
               const priceStr = formData[objKey];
               priceStr.includes('.') &&
                  priceStr.split('.')[1].length > 2 &&
                  alert(
                     `Price entered ${priceStr} cannot have more than 2 decimal places`
                  );
               ((priceStr.includes('.') &&
                  priceStr.split('.')[1].length <= 2) ||
                  !priceStr.includes('.')) &&
                  postData(formData, objKey);

               break;

            default:
               break;
         }
      });
   };

   // Input Element(s)
   const inputElEntries = initialDataEntries.map(([k, v]) => (
      <Box key={k} mb={2}>
         <DialogContentText>
            {k !== 'service_type_id' &&
               k !== 'duration_id' &&
               k !== 'time_interval' &&
               k !== 'service_type_name' &&
               k.replace('_', ' ')}
         </DialogContentText>

         {(k === 'service_type_id' && (
            <Dropdown
               label="choose a service type"
               options={serviceTypeOptions}
               value={serviceType}
               handleChange={(e) => handleDropDownChange(e, setServiceType)}
            />
         )) ||
            (k !== 'duration_id' && (
               <TextField
                  name={k}
                  id={k}
                  value={formData[k]} // NOTE: changing this to v will cause re-render
                  onChange={handleChange}
               />
            ))}
      </Box>
   ));

   return (
      <div>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add {title}</DialogTitle>
            <DialogContent>
               {inputElEntries}{' '}
               {serviceType === '3' && (
                  <Dropdown
                     label="choose a duration (minutes)"
                     options={durationOptions}
                     value={duration}
                     handleChange={(e) => handleDropDownChange(e, setDuration)}
                  />
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
