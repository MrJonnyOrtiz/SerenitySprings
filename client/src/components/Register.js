import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';

function Register({ handleCurrentUser }) {
   const [error, setError] = useState('');

   const history = useHistory();

   const initialData = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
   };

   const { formData, handleChange } = useForm(initialData);

   const handleSubmit = (e) => {
      e.preventDefault();

      const configObjNewUser = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ ...formData }),
      };

      fetch(`/users`, configObjNewUser).then((res) => {
         if (res.ok) {
            res.json().then((user) => {
               console.log('new user created');

               // create an account
               const configObjAccount = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     user_id: user.id,
                  }),
               };
               fetch('/accounts', configObjAccount).then((res) => {
                  if (res.ok) {
                     res.json().then((newAccount) => {
                        console.log('new account created');
                     });
                  } else {
                     res.json().then(
                        (data) => console.log(data.errors)
                        // TODO: HANDLE ERROR
                        //   setError(data.errors.service_type_name[0])
                        // data.errors.duration[0]
                        // data.errors.service_type[0]
                     );
                  }
               });
               // create a wishlist
               const configObjWishlist = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                     user_id: user.id,
                  }),
               };
               fetch('/wishlists', configObjWishlist).then((res) => {
                  if (res.ok) {
                     res.json().then((newWishlist) => {
                        console.log('new wishlist created');
                     });
                  } else {
                     res.json().then(
                        (data) => console.log(data.errors)
                        // TODO: HANDLE ERROR
                        //   setError(data.errors.service_type_name[0])
                        // data.errors.duration[0]
                        // data.errors.service_type[0]
                     );
                  }
               });
               handleCurrentUser(user);
               history.push('/logout');
               history.push('/login');
               alert(`Welcome, ${user.first_name}!  Please login below.`);
            });
         } else {
            res.json().then((data) => setError(data.errors));
         }
      });
   };

   return (
      <div>
         <h2>Register</h2>
         <div className="form-container form-center">
            <form onSubmit={handleSubmit}>
               <fieldset>
                  <label>
                     First Name: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Last Name: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Email: &nbsp;&nbsp;
                     <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Password: &nbsp;&nbsp;
                     <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </fieldset>
               <fieldset>
                  <label>
                     Confirm Password: &nbsp;&nbsp;
                     <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                     />
                  </label>
               </fieldset>

               {error.email && (
                  <div className="error">
                     {error.email && `Email ${formData.email} ${error.email}`}.
                  </div>
               )}
               {error.password_confirmation && (
                  <div className="error">
                     Password confirmation {error.password_confirmation}
                  </div>
               )}

               <button className="btn-submit" type="submit">
                  Register!
               </button>
            </form>
         </div>
      </div>
   );
}

export default Register;
