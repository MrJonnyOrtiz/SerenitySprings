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
   functionTitle,
   endpoint,
   updateService,
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
            res.json().then((obj) => {
               addArr(arr, obj, setArr);

               history.push(`/${arrName.toLowerCase().replace(' ', '_')}`);
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

   const patchData = (dataObj, objKey) => {
      const configObj = {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ ...dataObj }),
      };

      fetch(`/${endpoint + '/' + dataObj.id}`, configObj).then((res) => {
         if (res.ok) {
            res.json().then((obj) => {
               updateService(obj);

               history.push(`/${arrName.toLowerCase().replace(' ', '_')}`);
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
                  functionTitle === 'Add'
                     ? postData(formData, objKey)
                     : patchData(formData, objKey);
               }
               break;

            case 'service_type_name':
               const validServiceTypes = ['Spa', 'Salon', 'Products'];

               if (validServiceTypes.includes(formData[objKey])) {
                  functionTitle === 'Add'
                     ? postData(formData, objKey)
                     : patchData(formData, objKey);
               } else {
                  alert(`${formData[objKey]} not a valid service.`);
               }

               break;

            case 'price':
               const priceStr = String(formData[objKey]);
               priceStr.includes('.') &&
                  priceStr.split('.')[1].length > 2 &&
                  alert(
                     `Price entered ${priceStr} cannot have more than 2 decimal places`
                  );
               ((priceStr.includes('.') &&
                  priceStr.split('.')[1].length <= 2) ||
                  !priceStr.includes('.')) &&
                  (functionTitle === 'Add'
                     ? postData(formData, objKey)
                     : patchData(formData, objKey));

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
               k !== 'id' &&
               k.replace('_', ' ')}
         </DialogContentText>
         {/* {`${k} ${v}`} */}
         {/* TODO: if the key is service_type_id or duration_id, render the dropdown, or if the key isn't service_type_id or duration_id and the value isn't 0 and 'Salon' and 'id', render the TextField with the key and form data */}
         {(k === 'service_type_id' && (
            <Dropdown
               label="choose a service type"
               options={serviceTypeOptions}
               value={serviceType}
               handleChange={(e) => handleDropDownChange(e, setServiceType)}
            />
         )) ||
            (k === 'duration_id' && (
               <Dropdown
                  label="choose a duration (minutes)"
                  options={durationOptions}
                  value={duration}
                  handleChange={(e) => handleDropDownChange(e, setDuration)}
               />
            )) ||
            ((k !== 'service_type_id' || k !== 'duration_id') &&
               v !== 0 &&
               v !== 'Salon' &&
               k !== 'id' && (
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
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle>
            {functionTitle} {title}
         </DialogTitle>
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
            <Button onClick={handleSubmit}>
               {functionTitle} {title}
            </Button>
         </DialogActions>
      </Dialog>
   );
}
