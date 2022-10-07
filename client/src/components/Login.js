import Register from './Register';
import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';

function Login({ handleCurrentUser }) {
   const [toggle, setToggle] = useState(true);
   const [error, setError] = useState('');

   const history = useHistory();

   const initialData = {
      email: '',
      password: '',
   };

   const { formData, handleChange } = useForm(initialData);

   function handleClick() {
      setToggle((preToggle) => !preToggle);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      // login user
      fetch('/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ ...formData }),
      }).then((r) => {
         if (r.ok) {
            r.json().then((user) => {
               handleCurrentUser(user);
               history.push('/');
            });
         } else {
            r.json().then((json) => setError(json.error));
            history.push('/login');
         }
      });
   };

   return (
      <div>
         <h2>Welcome to Serenity Springs!</h2>
         <h2>Login below if you have an account, or register as a new user.</h2>
         {toggle ? (
            <div>
               <h2>Login</h2>
               <div className="form-container form-center">
                  <form onSubmit={handleSubmit}>
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
                     {error && <div className="error">{error}.</div>}
                     <button className="btn-submit" type="submit">
                        Login!
                     </button>
                  </form>
               </div>
            </div>
         ) : (
            <Register handleCurrentUser={handleCurrentUser} />
         )}
         <div className="form-center">
            <button onClick={handleClick}>
               {' '}
               {toggle ? 'Register' : 'Login'}
            </button>
         </div>
      </div>
   );
}

export default Login;
