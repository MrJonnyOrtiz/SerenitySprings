import logo from '../assets/serenitySpringsLogoNoName.png';

import { Link } from 'react-router-dom';

function Header() {
   return (
      <div>
         <header>
            <div className="parent">
               <div className="child">
                  <Link className="nav-link" to="/">
                     <img
                        src={logo}
                        alt="serenity springs organic salon and spa logo"
                     />
                  </Link>
               </div>
               <div className="child">
                  <h1>Serenity Springs</h1>
               </div>
            </div>
         </header>
      </div>
   );
}

export default Header;
