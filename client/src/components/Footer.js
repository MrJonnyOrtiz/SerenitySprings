import { Link } from 'react-router-dom';

function Footer() {
   return (
      <footer>
         <div className="footer-content">
            <h3>Serenity Springs</h3>
            <p>
               <i>live in peace</i>
            </p>
            <ul className="socials">
               <li>
                  <Link to="#">
                     <i className="fa-brands fa-facebook"></i>
                  </Link>
               </li>
               <li>
                  <Link to="#">
                     <i className="fa-brands fa-twitter"></i>
                  </Link>
               </li>
               <li>
                  <Link to="#">
                     <i className="fa-brands fa-google-plus"></i>
                  </Link>
               </li>
               <li>
                  <Link to="#">
                     <i className="fa-brands fa-youtube"></i>
                  </Link>
               </li>
               <li>
                  <Link to="#">
                     <i className="fa-brands fa-linkedin"></i>
                  </Link>
               </li>
            </ul>
            <div className="footer-bottom">
               <div className="footer-menu">
                  <ul>
                     <li>
                        <Link to="/services">Services</Link>
                     </li>
                     <li>
                        <Link to="/about">About</Link>
                     </li>
                     <li>
                        <Link to="#">Contact</Link>
                     </li>
                     <li>
                        <Link to="#">Blog</Link>
                     </li>
                  </ul>
               </div>
               <p>
                  Copyright © 2021{' '}
                  <Link
                     to="https://cloudrealmllc.com"
                     target="_blank"
                     rel="noopener noreferrer"
                  >
                     Cloud Realm LLC
                  </Link>
               </p>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
