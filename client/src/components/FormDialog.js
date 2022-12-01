import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({
   initialData,
   arrName,
   addArr,
   open,
   handleClickOpen,
   handleClose,
   title,
   endpoint,
}) {
   const history = useHistory();

   const { formData, handleChange } = useForm(initialData);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (formData.time_interval < 0) {
         console.log('Time interval cannot be negative');
      } else if (!(formData.time_interval % 15 === 0)) {
         console.log('Time interval must be in 15 minute increments');
      } else {
         // post it
         const configObj = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData }),
         };

         fetch(`/${endpoint}`, configObj).then((res) => {
            if (res.ok) {
               res.json().then((newDuration) => {
                  addArr(newDuration);
                  alert(`${formData.time_interval} added`);

                  history.push(`/${arrName}`);
               });
            } else {
               res.json().then((data) => {
                  alert(
                     `${formData.time_interval} ${data.errors.time_interval[0]}`
                  );
               });
            }
         });
      }
   };

   return (
      <div>
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add {title}</DialogTitle>
            <DialogContent>
               <DialogContentText>Enter a {title}</DialogContentText>
               <input
                  type="number"
                  step="15"
                  name="time_interval"
                  id="time_interval"
                  value={formData.time_interval}
                  onChange={handleChange}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleSubmit}>Add {title}</Button>
            </DialogActions>
         </Dialog>
      </div>
   );
}
